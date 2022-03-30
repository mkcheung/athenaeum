<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Citation;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BookController extends Controller
{
    public function __construct()
    {
         $this->middleware('perm.auth:book-list', ['only' => ['index','show','showUserBooks']]);
         $this->middleware('perm.auth:book-create', ['only' => ['create','store']]);
         $this->middleware('perm.auth:book-edit', ['only' => ['edit','update']]);
         $this->middleware('perm.auth:book-delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Book::get();
        return $books->toJson();
    }

    public function showUserBooks(Request $request)
    {
        $userId = $request->query('userId');
        $books = Book::where('user_id', '=', $userId)->with('citations')->with('chapters')->get();
        return $books->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $bookData = $request->get('data');

        $pagesInBook = $bookData['pages'] ? $bookData['pages'] : '';
        $author_first_name = $bookData['author_first_name'] ? $bookData['author_first_name'] : '';
        $author_middle = $bookData['author_middle'] ? $bookData['author_middle'] : '';
        $author_last_name = $bookData['author_last_name'] ? $bookData['author_last_name'] : '';
        $userId = $bookData['userId'];
        $bookTitle = (!empty($bookData['jsonFile'])) ? $bookData['jsonFile']['title'] : $bookData['bookTitle'];
        $bookCitations = (!empty($bookData['jsonFile'])) ? $bookData['jsonFile']['highlights'] : null;
        $citationsToCreate = [];
        $now = \Carbon\Carbon::now();

        $book = Book::create([
            'title' => $bookTitle,
            'user_id' => $userId,
            'author_first_name' => $author_first_name,
            'author_middle' => $author_middle,
            'author_last_name' => $author_last_name,
            'pages' => (int)$pagesInBook
        ]);

        if($bookCitations){
            foreach($bookCitations as $bookCitation){
                $citationsToCreate[] = [
                    'book_id' => $book->id,
                    'content' => $bookCitation['text'],
                    'page' => $bookCitation['location']['value'],
                    'created_at' => $now,
                    'updated_at' => $now
                ];
            }
            $results = Citation::insert($citationsToCreate);
        }

        return response()->json([]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        //
    }

    public function searchByTitle(Request $request)
    {
        $bookTitle = $request->query('bookTitle');
        $bookCitations =  !empty($bookTitle) ? Book::where('title', 'like', '%' . $bookTitle . '%')->with('citations')->get()->toArray() : [];

        return $bookCitations;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->chapters->each(function($chapter){
            $chapter->delete();
        });
        $book->citations->each(function($citation){
            $citation->delete();
        });
        $book->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Book deleted successfully'
        ], Response::HTTP_OK);
    }
}
