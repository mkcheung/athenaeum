<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class JWTAuth extends TestCase
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
    }
}
