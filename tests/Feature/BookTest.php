<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Book;
use App\Models\Chapter;
use App\Models\Citation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class BookTest extends TestCase
{

    private function setUpAuthentication(){

        $user = User::where('email', 'wise@gmail.com')->first();
        $token = JWTAuth::fromUser($user);

        return $this->withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $token,
            ]);
    }

    public function testIndex()
    {
        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('GET', 'api/books');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);
    }

    // TO DO:set up dummy user candidate for testing
    // replace in book setup and url call
    public function testShowUserBooks()
    {
        $headerSetup = $this->setUpAuthentication();

        $bookToDelete = Book::factory([
            'title' => 'Testbook',
            'author_first_name' => 'testAuthFirstName',
            'author_middle' => 'testAuthMidName',
            'author_last_name' => 'testAuthLastName',
            'pages' => 550,
            'user_id' => 9 
        ])->create();


        $response = $headerSetup->json('GET', "api/books/showUserBooks/?userId=9");

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        // there should always be at least one post from the superadmin
        $this->assertIsInt($decodedJson[0]['id']);
        $this->assertIsString($decodedJson[0]['title']);
        $this->assertIsString($decodedJson[0]['author_first_name']);
        $this->assertStringContainsString('testAuthFirstName', $decodedJson[0]['author_first_name']);
        $this->assertIsString($decodedJson[0]['author_middle']);
        $this->assertStringContainsString('testAuthMidName', $decodedJson[0]['author_middle']);
        $this->assertIsString($decodedJson[0]['author_last_name']);
        $this->assertStringContainsString('testAuthLastName', $decodedJson[0]['author_last_name']);
        $this->assertIsInt($decodedJson[0]['pages']);
        $this->assertEquals(
            550,
            $decodedJson[0]['pages']
        );
        $this->assertIsInt($decodedJson[0]['user_id']);
        $this->assertEquals(
            9,
            $decodedJson[0]['user_id']
        );
        $this->assertIsArray(
            $decodedJson[0]['citations']
        );
        $this->assertIsArray(
            $decodedJson[0]['chapters']
        );
        $book_to_delete=Book::find($bookToDelete->id);
        $book_to_delete->delete();
    }

    // TO DO:set up dummy user candidate for testing
    // replace in book setup and url call
    public function testSearchByTitle()
    {
        $headerSetup = $this->setUpAuthentication();

        $bookToDelete = Book::factory([
            'title' => 'Testbook',
            'author_first_name' => 'testAuthFirstName',
            'author_middle' => 'testAuthMidName',
            'author_last_name' => 'testAuthLastName',
            'pages' => 550,
            'user_id' => 9 
        ])->create();


        $response = $headerSetup->json('GET', 'api/books/searchByTitle/?bookTitle=Testbook');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();

        // there should always be at least one post from the superadmin
        $this->assertIsInt($decodedJson[0]['id']);
        $this->assertIsString($decodedJson[0]['title']);
        $this->assertIsString($decodedJson[0]['author_first_name']);
        $this->assertStringContainsString('testAuthFirstName', $decodedJson[0]['author_first_name']);
        $this->assertIsString($decodedJson[0]['author_middle']);
        $this->assertStringContainsString('testAuthMidName', $decodedJson[0]['author_middle']);
        $this->assertIsString($decodedJson[0]['author_last_name']);
        $this->assertStringContainsString('testAuthLastName', $decodedJson[0]['author_last_name']);
        $this->assertIsInt($decodedJson[0]['pages']);
        $this->assertEquals(
            550,
            $decodedJson[0]['pages']
        );
        $this->assertIsInt($decodedJson[0]['user_id']);
        $this->assertEquals(
            9,
            $decodedJson[0]['user_id']
        );
        $this->assertIsArray(
            $decodedJson[0]['citations']
        );
        $bookToDelete->delete();
    }

    public function testDelete(){

        $headerSetup = $this->setUpAuthentication();
        $bookToDelete = Book::factory([
            'title' => 'Testbook',
            'author_first_name' => 'testAuthFirstName',
            'author_middle' => 'testAuthMidName',
            'author_last_name' => 'testAuthLastName',
            'pages' => 550,
            'user_id' => 9 
        ])->create();
        $chapterToDelete = Chapter::factory([
            'page_begin' => 1,
            'page_end' => 1,
            'chapter_number' => 1,
            'chapter_title' => 'chapterToDelete',
            'book_id' => $bookToDelete->id
        ])->create();
        $citationToDelete = Citation::factory([
            'page' => 1,
            'chapter' => 1, 
            'content' => 'yadda yadda',
            'book_id' => $bookToDelete->id
        ])->create();

        $response = $this->delete('/api/books/' . $bookToDelete->id);
        $decodedJson = $response->decodeResponseJson();
        $this->assertTrue($decodedJson['success']);
        $this->assertStringContainsString('Book deleted successfully', $decodedJson['message']);
    }
}
