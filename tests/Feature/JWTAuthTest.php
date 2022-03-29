<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class JWTAuthTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRegister()
    {
        $response = $this->json('POST', 'api/register', [
            'name' => 'Test',
            'first_name' => 'test',
            'last_name' => 'lastnametest',
            'email' => time().'test@example.com',
            'password' => '123456',
            'password_confirmation' => '123456',
        ]);

        \Log::info(1, [$response->getContent()]);

        $response->assertStatus(201);
        $decodedJson = $response->decodeResponseJson();
        $this->assertIsString($decodedJson['message']);
        $this->assertStringContainsString('User successfully registered', $decodedJson['message']);
        $this->assertStringContainsString('Test', $decodedJson['user']['name']);
        $this->assertStringContainsString('test', $decodedJson['user']['first_name']);
        $this->assertStringContainsString('lastnametest', $decodedJson['user']['last_name']);
        $this->assertIsString($decodedJson['user']['email']);
        $this->assertMatchesRegularExpression('/^.+\@\S+\.\S+$/', $decodedJson['user']['email']);
        $this->assertIsInt($decodedJson['user']['id']);
        $this->assertStringContainsString('test lastnametest', $decodedJson['user']['full_name']);
        $this->assertIsArray(
            $decodedJson['user']['roles']
        );
        $this->assertIsInt($decodedJson['user']['roles'][0]['id']);
        $this->assertIsString($decodedJson['user']['roles'][0]['name']);
        $this->assertStringContainsString('author', $decodedJson['user']['roles'][0]['name']);
        $this->assertIsString($decodedJson['user']['roles'][0]['guard_name']);
        $this->assertStringContainsString('api', $decodedJson['user']['roles'][0]['guard_name']);
    }

    public function testRegisterMissingFields()
    {
        $response = $this->json('POST', 'api/register', []);

        \Log::info(1, [$response->getContent()]);

        $response->assertStatus(400);
        
    }

    public function testLoginSuperAdmin(){
        $response = $this->json('post', '/api/login', [
            'email' => 'wise@gmail.com',
            'password' => '123456'
        ]);

        \Log::info(1, [$response->getContent()]);

        $response->assertStatus(200);
        $decodedJson = $response->decodeResponseJson();
        $this->assertIsString($decodedJson['access_token']);
        $this->assertIsString($decodedJson['token_type']);
        $this->assertStringContainsString('bearer', $decodedJson['token_type']);
        $this->assertIsInt($decodedJson['expires_in']);
        $this->assertStringContainsString('Wise', $decodedJson['user']['name']);
        $this->assertStringContainsString('Socratic', $decodedJson['user']['first_name']);
        $this->assertStringContainsString('Epistemologist', $decodedJson['user']['last_name']);
        $this->assertIsString($decodedJson['user']['email']);
        $this->assertStringContainsString('wise@gmail.com', $decodedJson['user']['email']);
        $this->assertIsArray(
            $decodedJson['permissions']
        );
        $this->assertTrue($decodedJson['isSuperAdmin']);
        // dd($decodedJson);
    }

    public function testLoginAdmin(){
        $response = $this->json('post', '/api/login', [
            'email' => 'apprentice@gmail.com',
            'password' => '123456'
        ]);

        \Log::info(1, [$response->getContent()]);

        $response->assertStatus(200);
        $decodedJson = $response->decodeResponseJson();
        $this->assertIsString($decodedJson['access_token']);
        $this->assertIsString($decodedJson['token_type']);
        $this->assertStringContainsString('bearer', $decodedJson['token_type']);
        $this->assertIsInt($decodedJson['expires_in']);
        $this->assertStringContainsString('Apprentice', $decodedJson['user']['name']);
        $this->assertStringContainsString('Padawan', $decodedJson['user']['first_name']);
        $this->assertStringContainsString('Learner', $decodedJson['user']['last_name']);
        $this->assertIsString($decodedJson['user']['email']);
        $this->assertStringContainsString('apprentice@gmail.com', $decodedJson['user']['email']);
        $this->assertIsArray(
            $decodedJson['permissions']
        );

        // dd($decodedJson);
        $this->assertContains(
            "role-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "role-create",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "role-edit",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "role-delete",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "post-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "post-create",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "post-edit",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "post-delete",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "category-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "category-edit",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "category-delete",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "comment-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "comment-create",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "comment-edit",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "tag-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "tag-create",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "tag-edit",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "tag-delete",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "book-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "home-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "user-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "user-create",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "user-edit",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "user-delete",
            $decodedJson['permissions']
        );

        $this->assertFalse($decodedJson['isSuperAdmin']);
    }

    public function testLoginAuthor(){
        $response = $this->json('post', '/api/login', [
            'email' => 'listener@gmail.com',
            'password' => '123456'
        ]);

        \Log::info(1, [$response->getContent()]);

        $response->assertStatus(200);
        $decodedJson = $response->decodeResponseJson();
        $this->assertIsString($decodedJson['access_token']);
        $this->assertIsString($decodedJson['token_type']);
        $this->assertStringContainsString('bearer', $decodedJson['token_type']);
        $this->assertIsInt($decodedJson['expires_in']);
        $this->assertStringContainsString('Listener', $decodedJson['user']['name']);
        $this->assertStringContainsString('Wise', $decodedJson['user']['first_name']);
        $this->assertStringContainsString('Listener', $decodedJson['user']['last_name']);
        $this->assertIsString($decodedJson['user']['email']);
        $this->assertStringContainsString('listener@gmail.com', $decodedJson['user']['email']);
        $this->assertIsArray(
            $decodedJson['permissions']
        );

        // dd($decodedJson);
        $this->assertContains(
            "post-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "post-create",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "post-edit",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "post-delete",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "comment-list",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "comment-create",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "comment-edit",
            $decodedJson['permissions']
        );
        $this->assertContains(
            "book-list",
            $decodedJson['permissions']
        );

        $this->assertFalse($decodedJson['isSuperAdmin']);
    }
}
