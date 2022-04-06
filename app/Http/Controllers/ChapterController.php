<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Citation;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chapters = Chapter::get();
        return $chapters->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $bookId = $request['data']['book_id'];
        $chapter = Chapter::create([
          'book_id' => $bookId,
          'page_begin' => $request['data']['page_begin'],
          'page_end' => $request['data']['page_end'],
          'chapter_number' => $request['data']['chapter_number'],
          'chapter_title' => $request['data']['chapter_title']
        ]);


        Citation::placeCitationWithinChapter($bookId);
        return response()->json('Chapter created!');
    }

    public function clearChapters(Request $request)
    {
        $data = $request->all();
        Chapter::where('book_id', '=', $data['data']['book_id'])->delete();
        return response()->json([
            'success' => true,
            'message' => 'Book chapters cleared successfully'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Chapter  $chapter
     * @return \Illuminate\Http\Response
     */
    public function show(Chapter $chapter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Chapter  $chapter
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chapter $chapter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Chapter  $chapter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chapter $chapter)
    {
        //
    }
}
