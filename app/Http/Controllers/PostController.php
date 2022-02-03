<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    protected $user;
 
    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->user
            ->products()
            ->get();
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        //   'name' => 'required',
        //   'description' => 'required',
        // ]);

        $post = Post::create([
          'title' => $request['name'],
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
        $post = $this->user->posts()->find($id);
    
        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, Post not found.'
            ], 400);
        }
    
        return $post;
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
        $post = Post::findOrFail($id);
        $post->name = $request->name;
        $post->slug = str_slug($request->name, '-');
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



