<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('perm.auth:user-list', ['only' => ['index', 'show']]);
        $this->middleware('perm.auth:user-create', ['only' => ['create','store']]);
        $this->middleware('perm.auth:user-edit', ['only' => ['edit','update']]);
        $this->middleware('perm.auth:user-delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('roles')->get();
        return $users->toJson();
    }

    public function showUserBlogPosts(Request $request)
    {

        $data = $request->all();
        $tagsRequested = [];

        if(!empty($data['tags'])){
          foreach($data['tags'] as $row){
            $tagObj = json_decode($row);
            $tagsRequested[] = $tagObj->id;
          }
        }

        $userId = $request->query('userId');

        $userPosts = User::where('id', '=', $userId)
            ->with(['posts' => function ($query) use ($tagsRequested) {
                $query->where('published', '=', 1);
                $query->when(!empty($tagsRequested), function($query2) use ($tagsRequested) {
                    $query2->whereHas('tags', function($query3) use ($tagsRequested) {
                        $query3->whereIn('id', $tagsRequested);
                    });
                });
            }])
            ->get();

        return $userPosts->toJson();
    }

    //TO DO: Limit To Authors Only
    public function showAuthors(Request $request)
    {
        $users = User::with('posts')->where('active', '=', 1)->get();
        return $users->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, user not found.'
            ], 400);
        }
    
        return $user->toJson();
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
        $user = User::with('roles')->findOrFail($id);
        if(!empty($data['data']['role'])){

            if($data['data']['role'] === 'Admin'){
                $user->removeRole('author');
                $user->assignRole('admin');

            } else {
                $user->removeRole('admin');
                $user->assignRole('author');
            }
        } else if (!empty($data['data']['active'])) {
            if($data['data']['active'] === 'Active'){
                $user->active = true;
            } else {
                $user->active = false;
            }
        }
        $user->name = $data['data']['name'];
        $user->first_name = $data['data']['first_name'];
        $user->last_name = $data['data']['last_name'];
        $user->email = $data['data']['email'];
    
        $user->save();
        return $user->toJson();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::find($id)->delete();
    }
}
