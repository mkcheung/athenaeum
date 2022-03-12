<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    protected $user;
 
    public function __construct()
    {
        $this->middleware('perm.auth:post-create', ['only' => ['create','store']]);
        $this->middleware('perm.auth:post-edit', ['only' => ['edit','update']]);
        $this->middleware('perm.auth:post-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $postsByUser = User::with('posts')->get();
        return $postsByUser->toJson();
    }

    public function getUserPosts(Request $request)
    {
        $userId = $request->query('userId');
        $posts = Post::where('user_id', '=', $userId)->where('parent', '=', 1)->with('user')->orderBy('created_at')->get();
        return $posts->toJson();
    }

    public function getRecentPosts(Request $request)
    {

        $data = $request->all();
        $tagsRequested = [];

        if(!empty($data['tags'])){
            foreach($data['tags'] as $row){
                $tagObj = json_decode($row);
                $tagsRequested[] = $tagObj->id;
            }
        }

        $posts = Post::when(!empty($tagsRequested), function($query) use ($tagsRequested) {
            $query->whereHas('tags', function($query2) use ($tagsRequested) {
                $query2->whereIn('id', $tagsRequested);
            });
        })
        ->where('published', '=', 1)
        ->where('parent', '=', 1)
        ->with('user')
        ->limit(10)
        ->get();

        return $posts->toJson();
    }

    public function getPostAndDecendants(Request $request)
    {

        $postId = $request->query('postId');
        $posts = Post::where('id', '=', (int)$postId)->where('parent', '=', 1)->with('user')->with('allDescendantPosts')->with('tags')->get()->all();

        if(empty($posts)){
            return json_encode($posts);
        }

        $descendantPosts = [];
        $descendantPosts[] = [
            'title' => $posts[0]['title'],
            'content' => $posts[0]['content'],
            'id' => $posts[0]['id'],
            'slug' => $posts[0]['slug'],
            'user' => $posts[0]['user'],
            'published' => $posts[0]['published'],
            'descendant_post_id' => $posts[0]['descendant_post_id'],
            'created_at' => $posts[0]['created_at'],
            'updated_at' => $posts[0]['updated_at'],
            'user_id' => $posts[0]['user_id'],
        ];

        $allDescendantPosts = $posts[0]['allDescendantPosts'];
        $allAssociatedTags = $posts[0]['tags'];

        $this->processDescendants($posts[0]['allDescendantPosts'], $descendantPosts);


        usort($descendantPosts,[$this,"compareValues"]);

        return json_encode($descendantPosts);
    }

    private static function compareValues($a, $b){
        if ($a["id"] == $b["id"]) {
            return 0;
        }
        return ($a["id"] < $b["id"]) ? -1 : 1;
    }


    private function processDescendants($post, &$descendantPosts){

        if(is_null($post->first())){
            return;
        } else if(!empty($post[0]) && !empty($post[0]['allDescendantPosts'])) {
            $this->processDescendants($post[0]['allDescendantPosts'], $descendantPosts);
        }    

        $descendantPosts[] = [
            'title' => $post[0]['title'],
            'content' => $post[0]['content'],
            'id' => $post[0]['id'],
            'slug' => $post[0]['slug'],
            'user' => $post[0]['user'],
            'published' => $post[0]['published'],
            'descendant_post_id' => $post[0]['descendant_post_id'],
            'created_at' => $post[0]['created_at'],
            'updated_at' => $post[0]['updated_at'],
            'user_id' => $post[0]['user_id'],
        ];

        return;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $validatedData = $request->validate([
        //   'title' => 'required',
        //   'slug' => 'required',
        //   'content' => 'required',
        //   'published' => 'required',
        //   'category' => 'required',
        //   'user_id' => 'required',
        // ]);

        $post = Post::create([
          'title' => $request['title'],
          'slug' => $request['slug'],
          'content' => $request['content'],
          'published' => $request['published'],
          'category' => $request['category'],
          'user_id' => $request['user_id']
        ]);


        //Product created, return success response
        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'data' => $post
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\post  $post
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::where('id', $id)->with('comments', 'comments.replies', 'comments.replies.user', 'tags')->first();
    
        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, Post not found.'
            ], 400);
        }
    
        return $post->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $post = Post::findOrFail($id);
        $post->title = $data['data']['title'];
        $post->content = $data['data']['content'];
        if($data['data']['image']) {
            $post->image = $data['data']['image'];
            $destinationPath = public_path('post_images') . '/'.$post->title;
            file_put_contents($destinationPath, file_get_contents($post->image));
        }
        $selectedTagIds = [];
        $selectedTags = $data['data']['selectedTags'];
        foreach($selectedTags as $selectedTag){
            $selectedTagIds[] = $selectedTag['id'];
        }

        $post->tags()->sync($selectedTagIds);
        $post->slug = Str::slug($data['data']['title'], '-');
        $post->published = $data['data']['published'];
        $post->user_id = $data['data']['user_id'];
        $post->save();

        //Product updated, return success response
        return response()->json([
            'success' => true,
            'message' => 'Post updated successfully',
            'data' => $post
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post = $post->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Post deleted successfully'
        ], Response::HTTP_OK);
    }
}



