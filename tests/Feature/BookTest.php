<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions; 
use Tests\TestCase;

class BookTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testGetAuthorFullNameAttribute(){
        $book = Book::factory()->make();

        $bookData['title'] = 'Title Of Book';
        $bookData['author_first_name'] = 'Marcus';
        $bookData['author_last_name'] = 'Aurelius';
        $bookData['author_middle'] = 'Unknown';

        $book
            ->fill($bookData)
            ->save();

        $fullNameAttribute = $book->getAuthorFullNameAttribute();
        $this->assertStringContainsString('Marcus Unknown Aurelius', $fullNameAttribute);
    }
}