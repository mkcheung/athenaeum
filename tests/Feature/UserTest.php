<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserTest extends TestCase
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
        $response = $headerSetup->json('GET', 'api/users');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);
    }

    public function testShowAuthors()
    {
        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('GET', '/api/users/showAuthors');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        $this->assertIsInt($decodedJson[0]['id']);
        $this->assertIsString($decodedJson[0]['name']);
        $this->assertIsString($decodedJson[0]['first_name']);
        $this->assertIsString($decodedJson[0]['last_name']);
        $this->assertIsString($decodedJson[0]['full_name']);
        $this->assertMatchesRegularExpression('/^.+\@\S+\.\S+$/', $decodedJson[0]['email']);
    }

    public function testShow()
    {
        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('GET', 'api/users/1');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        // there should always be at least one post
        $this->assertIsInt($decodedJson['id']);
        $this->assertIsString($decodedJson['name']);
        $this->assertIsString($decodedJson['first_name']);
        $this->assertIsString($decodedJson['last_name']);
        $this->assertIsString($decodedJson['full_name']);
        $this->assertMatchesRegularExpression('/^.+\@\S+\.\S+$/', $decodedJson['email']);
    }

    public function testShowNonExistentUser()
    {
        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('GET', 'api/users/99999');

        $response->assertStatus(400);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        $this->assertFalse($decodedJson['success']);
        $this->assertStringContainsString('Sorry, user not found.',$decodedJson['message']);
    }

    public function testGetUserPosts()
    {
        $response = $this->json('GET', 'api/users/showUserBlogPosts?userId=1');

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        // there should always be at least one post from the superadmin
        $this->assertIsInt($decodedJson[0]['id']);
        $this->assertIsString($decodedJson[0]['name']);
        $this->assertIsString($decodedJson[0]['first_name']);
        $this->assertStringContainsString('Socratic', $decodedJson[0]['first_name']);
        $this->assertIsString($decodedJson[0]['last_name']);
        $this->assertStringContainsString('Epistemologist', $decodedJson[0]['last_name']);
        $this->assertIsString($decodedJson[0]['full_name']);
        $this->assertStringContainsString('Socratic Epistemologist', $decodedJson[0]['full_name']);
        $this->assertMatchesRegularExpression('/^.+\@\S+\.\S+$/', $decodedJson[0]['email']);
        $this->assertIsArray(
            $decodedJson[0]['posts']
        );

        $this->assertIsInt($decodedJson[0]['posts'][0]['id']);
        $this->assertIsInt($decodedJson[0]['posts'][0]['user_id']);
        $this->assertIsInt($decodedJson[0]['posts'][0]['published']);
        $this->assertIsString($decodedJson[0]['posts'][0]['title']);
        $this->assertIsString($decodedJson[0]['posts'][0]['slug']);
        $this->assertIsString($decodedJson[0]['posts'][0]['content']);
        $this->assertIsString($decodedJson[0]['posts'][0]['excerpt']);
    }

    public function testUpdateAuthor()
    {

        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('PATCH', '/api/users/3', [
            'data' => [
                "name" => "Listener",
                "first_name" => "Wise",
                "last_name" => "Listener",
                "email" => "listener@gmail.com",
                "password" => Hash::make(123456),
                "role" => 'Author',
                "active" => 'Active'
            ]
        ]);

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        $this->assertStringContainsString('Listener',$decodedJson['name']);
        $this->assertStringContainsString('author',$decodedJson['roles'][0]['name']);
    }

    public function testUpdateAdmin()
    {

        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('PATCH', '/api/users/3', [
            'data' => [
                "name" => "Listener",
                "first_name" => "Wise",
                "last_name" => "Listener",
                "email" => "listener@gmail.com",
                "password" => Hash::make(123456),
                "role" => 'Admin',
                "active" => 'Active'
            ]
        ]);

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        $this->assertStringContainsString('Listener',$decodedJson['name']);
        $this->assertStringContainsString('admin',$decodedJson['roles'][0]['name']);
    }

    public function testUpdateInActive()
    {

        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('PATCH', '/api/users/3', [
            'data' => [
                "name" => "Listener",
                "first_name" => "Wise",
                "last_name" => "Listener",
                "email" => "listener@gmail.com",
                "password" => Hash::make(123456),
                "active" => 'Inactive'
            ]
        ]);

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        $this->assertStringContainsString('Listener',$decodedJson['name']);
        $this->assertFalse($decodedJson['active']);
    }

    public function testUpdateActive()
    {

        $headerSetup = $this->setUpAuthentication();
        $response = $headerSetup->json('PATCH', '/api/users/3', [
            'data' => [
                "name" => "Listener",
                "first_name" => "Wise",
                "last_name" => "Listener",
                "email" => "listener@gmail.com",
                "password" => Hash::make(123456),
                "active" => 'Active'
            ]
        ]);

        $response->assertStatus(200);
        \Log::info(1, [$response->getContent()]);

        $decodedJson = $response->decodeResponseJson();
        $this->assertStringContainsString('Listener',$decodedJson['name']);
        $this->assertTrue($decodedJson['active']);
    }

    public function testDelete(){

        $headerSetup = $this->setUpAuthentication();
        $userToDelete = User::factory([
            'name' => 'name',
            'first_name' => 'firstname',
            'last_name' => 'lastname',
            'email' => 'name@something.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ])->create();

        $response = $this->delete('/api/users/' . $userToDelete->id);

        $response->assertStatus(200);
    }
}
