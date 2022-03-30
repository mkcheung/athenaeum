<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class PostTest extends TestCase
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
        $response = $this->json('GET', 'api/posts');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);
    }

    public function testGetUserPosts()
    {
        $response = $this->json('GET', 'api/posts/getUserPosts/?userId=1');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();

        // there should always be at least one post from the superadmin
        $this->assertIsInt($decodedJson[0]['id']);
        $this->assertIsString($decodedJson[0]['title']);
        $this->assertIsString($decodedJson[0]['slug']);
        $this->assertIsString($decodedJson[0]['content']);
        $this->assertIsInt($decodedJson[0]['user_id']);
        $this->assertIsString($decodedJson[0]['excerpt']);
        $this->assertIsInt($decodedJson[0]['user']['id']);
        $this->assertIsString($decodedJson[0]['user']['name']);
        $this->assertIsString($decodedJson[0]['user']['first_name']);
        $this->assertStringContainsString('Socratic', $decodedJson[0]['user']['first_name']);
        $this->assertIsString($decodedJson[0]['user']['last_name']);
        $this->assertStringContainsString('Epistemologist', $decodedJson[0]['user']['last_name']);
        $this->assertIsString($decodedJson[0]['user']['full_name']);
        $this->assertStringContainsString('Socratic Epistemologist', $decodedJson[0]['user']['full_name']);
        $this->assertMatchesRegularExpression('/^.+\@\S+\.\S+$/', $decodedJson[0]['user']['email']);
        $this->assertIsString($decodedJson[0]['user']['name']);
    }

    public function testGetRecentPosts()
    {
        $response = $this->json('GET', 'api/posts/getRecentPosts');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();

        // there should always be at least one post
        $this->assertIsInt($decodedJson[0]['id']);
        $this->assertIsString($decodedJson[0]['title']);
        $this->assertIsString($decodedJson[0]['slug']);
        $this->assertIsString($decodedJson[0]['content']);
        $this->assertIsInt($decodedJson[0]['user_id']);
        $this->assertIsInt($decodedJson[0]['published']);
        $this->assertIsInt($decodedJson[0]['parent']);
        $this->assertIsString($decodedJson[0]['excerpt']);
        $this->assertIsInt($decodedJson[0]['user']['id']);
        $this->assertIsString($decodedJson[0]['user']['name']);
        $this->assertIsString($decodedJson[0]['user']['first_name']);
        $this->assertIsString($decodedJson[0]['user']['last_name']);
        $this->assertIsString($decodedJson[0]['user']['full_name']);
        $this->assertIsString($decodedJson[0]['user']['name']);
    }

    public function testShow()
    {
        $response = $this->json('GET', 'api/posts/show/1');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        // there should always be at least one post
        $this->assertIsInt($decodedJson['id']);
        $this->assertIsString($decodedJson['title']);
        $this->assertIsString($decodedJson['slug']);
        $this->assertIsString($decodedJson['content']);
        $this->assertIsInt($decodedJson['user_id']);
        $this->assertIsInt($decodedJson['published']);
        $this->assertIsInt($decodedJson['parent']);
        $this->assertIsString($decodedJson['excerpt']);
    }

    public function testShowNonExistentPost()
    {
        $response = $this->json('GET', 'api/posts/show/99999');

        $response->assertStatus(400);
        \Log::info(1, [$response->getContent()]);
    }

    public function testStore()
    {

        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('POST', '/api/posts', [
                'title' => 'Test',
                'slug' =>  Str::slug('Test', '-'),
                'content' => 'testingcontent',
                'published' => true,
                'category' => 1,
                'user_id' => 1,
        ]);

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();

        $this->assertTrue($decodedJson['success']);
        $this->assertStringContainsString('Post created successfully',$decodedJson['message']);
        $this->assertStringContainsString('Test',$decodedJson['data']['title']);
        $this->assertStringContainsString('test',$decodedJson['data']['slug']);
        $this->assertStringContainsString('testingcontent',$decodedJson['data']['content']);
        $this->assertTrue($decodedJson['data']['published']);
        $this->assertIsInt($decodedJson['data']['user_id']);
        $this->assertEquals(1, $decodedJson['data']['user_id']);
        $this->assertIsInt($decodedJson['data']['id']);
    }

    public function testUpdate()
    {

        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('PATCH', '/api/posts/1', [
            'data' => [
                'title' => 'Test2',
                'slug' =>  Str::slug('Test', '-'),
                'content' => 'testingcontent',
                'published' => true,
                'category' => 1,
                'image' => '',
            ]
        ]);

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();

        $this->assertTrue($decodedJson['success']);
        $this->assertStringContainsString('Post updated successfully',$decodedJson['message']);
        $this->assertStringContainsString('Test2',$decodedJson['data']['title']);
    }

    // TO DO: Take notes on how to utilize factories to test entity deletion
    public function testDelete(){

        $headerSetup = $this->setUpAuthentication();
        $user = User::inRandomOrder()->first();
        $postToDelete = Post::factory([
            'title' => 'toDelete',
            'slug' => 'toDelete',
            'content' => 'toDelete',
            'published' => true,
            'category_id' => 1,
            'user_id' => 1
        ])->create();

        $response = $this->delete('/api/posts/' . $postToDelete->id);

        $response->assertStatus(200);
    }
}
