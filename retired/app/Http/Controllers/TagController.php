<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{

    public function __construct()
    {
        $this->middleware('perm.auth:tag-list', ['only' => ['index', 'show', 'getTagsToPosts']]);
        $this->middleware('perm.auth:tag-create', ['only' => ['create','store']]);
        $this->middleware('perm.auth:tag-edit', ['only' => ['edit','update']]);
        $this->middleware('perm.auth:tag-delete', ['only' => ['destroy']]);
    }

    public function index()
    {
        $tags = Tag::get();

        return $tags->toJson();
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('tags.create');
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

        $project = Tag::create([
          'title' => $request['name']
        ]);

        return response()->json('Tag created!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $tag = Tag::where('slug', $slug)->first();
        return view('tags.show', compact('post'));
    }

    public function showTags(Request $request)
    {
        $tags = Tag::get();

        return $tags->toJson();
    }
 
    public function getTagsToPosts()
    {
        $tagsToPosts = Tag::with('posts')->get();
        return $tagsToPosts->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tag = Tag::findOrFail($id);
        return view('tags.edit', compact('post'));
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
        $tag = Tag::findOrFail($id);
        $tag->title = $request->title;
        $tag->save();
        return redirect('tags');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);
        $tag = $tag->delete();
        return redirect('tags');
    }
}
