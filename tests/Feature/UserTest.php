<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions; 
use Tests\TestCase;

class UserTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testGetFullNameAttribute(){
        $user = User::factory()->make();

        $userData['name'] = 'John Doe';
        $userData['first_name'] = 'John';
        $userData['last_name'] = 'Doe';
        $userData['email'] = 'johndoe@gmail.com';
        $userData['password'] = '12345';

        $user
            ->fill($userData)
            ->save();

        $fullNameAttribute = $user->getFullNameAttribute();
        $this->assertStringContainsString('John Doe', $fullNameAttribute);
    }
}