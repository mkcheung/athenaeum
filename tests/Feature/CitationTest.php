<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\Chapter;
use App\Models\Citation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions; 
use Tests\TestCase;

class CitationTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testPlaceCitationWithinChapter(){


        $book = Book::factory()->create();

        $bookData['title'] = 'Title Of Book';
        $bookData['author_first_name'] = 'Marcus';
        $bookData['author_last_name'] = 'Aurelius';
        $bookData['author_middle'] = 'Unknown';

        $book
            ->fill($bookData)
            ->save();

        $chapterOne = Chapter::factory()->create();
        $chapterOneData['page_begin'] = 1;
        $chapterOneData['page_end'] = 20;
        $chapterOneData['chapter_number'] = 1;
        $chapterOneData['chapter_title'] = 'Prologue';
        $chapterOneData['book_id'] = $book['id'];

        $chapterOne
            ->fill($chapterOneData)
            ->save();

        $chapterTwo = Chapter::factory()->create();
        $chapterTwoData['page_begin'] = 21;
        $chapterTwoData['page_end'] = 30;
        $chapterTwoData['chapter_number'] = 2;
        $chapterTwoData['chapter_title'] = 'Second Chapter';
        $chapterTwoData['book_id'] = $book['id'];

        $chapterTwo
            ->fill($chapterTwoData)
            ->save();

        $citation = Citation::factory()->create();
        $citationData['page'] = 25;
        $citationData['content'] = 'The text of the citation';
        $citationData['book_id'] = $book['id'];

        $citation
            ->fill($citationData)
            ->save();

        Citation::placeCitationWithinChapter($book['id']);

        $resultsFromBook = Citation::latest()->first();
        $this->assertEquals($resultsFromBook['chapter'], 2);
    }
}