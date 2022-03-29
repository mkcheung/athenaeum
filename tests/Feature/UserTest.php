<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

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
}
