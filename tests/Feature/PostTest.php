<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\PostTag;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions; 
use Tests\TestCase;

class PostTest extends TestCase
{
    use DatabaseTransactions;

    public function testGetUserPosts()
    {
        $user = User::factory()->make();

        $userData['name'] = 'John Doe';
        $userData['first_name'] = 'John';
        $userData['last_name'] = 'Doe';
        $userData['email'] = 'johndoe@gmail.com';
        $userData['password'] = '12345';

        $user
            ->fill($userData)
            ->save();

        $post1 = Post::factory()->make();
        $post1Data['title'] = 'Title One';
        $post1Data['slug'] = 'title_one';
        $post1Data['content'] = 'Testing Post Content One';
        $post1Data['user_id'] = $user['id'];
        $post1
            ->fill($post1Data)
            ->save();


        $post2 = Post::factory()->make();
        $post2Data['title'] = 'Title Two';
        $post2Data['slug'] = 'title_two';
        $post2Data['content'] = 'Testing Post Content Two';
        $post2Data['user_id'] = $user['id'];

        $post2
            ->fill($post2Data)
            ->save();

        $response = $this->get(route('getUserPosts',[
            'userId' => $user['id']
        ]));

        $decodedJson = $response->decodeResponseJson();

        $this->assertEquals($decodedJson[0]['user_id'], $user['id']);
        $this->assertStringContainsString('Title One', $decodedJson[0]['title']);
        $this->assertStringContainsString('title_one', $decodedJson[0]['slug']);
        $this->assertStringContainsString('Testing Post Content One', $decodedJson[0]['content']);
        $this->assertEquals($decodedJson[1]['user_id'], $user['id']);
        $this->assertStringContainsString('Title Two', $decodedJson[1]['title']);
        $this->assertStringContainsString('title_two', $decodedJson[1]['slug']);
        $this->assertStringContainsString('Testing Post Content Two', $decodedJson[1]['content']);
    }


    public function testGetPostAndDescendants(){
        $user = User::factory()->make();

        $userData['name'] = 'John Doe';
        $userData['first_name'] = 'John';
        $userData['last_name'] = 'Doe';
        $userData['email'] = 'johndoe@gmail.com';
        $userData['password'] = '12345';

        $user
            ->fill($userData)
            ->save();

        $post2 = Post::factory()->make();

        $post2Data['title'] = 'Title Two';
        $post2Data['slug'] = 'title_two';
        $post2Data['content'] = 'Testing Post Content Two';
        $post2Data['user_id'] = $user['id'];
        $post2
            ->fill($post2Data)
            ->save();

        $post1 = Post::factory()->make();

        $post1Data['title'] = 'Title One';
        $post1Data['slug'] = 'title_one';
        $post1Data['content'] = 'Testing Post Content One';
        $post1Data['user_id'] = $user['id'];
        $post1Data['descendant_post_id'] = $post2['id'];
        $post1Data['parent'] = true;

        $post1
            ->fill($post1Data)
            ->save();
        

        $response = $this->get(route('getPostAndDecendants',[
            'postId' => $post1['id']
        ]));


        $decodedJson = $response->decodeResponseJson();
        $this->assertEquals(count($decodedJson),2);
        $this->assertStringContainsString('Title Two', $decodedJson[0]['title']);
        $this->assertStringContainsString('title_two', $decodedJson[0]['slug']);
        $this->assertNull($decodedJson[0]['descendant_post_id']);
        $this->assertEquals($decodedJson[0]['user_id'], $user['id']);

        $this->assertStringContainsString('Title One', $decodedJson[1]['title']);
        $this->assertStringContainsString('title_one', $decodedJson[1]['slug']);
        $this->assertEquals($decodedJson[1]['descendant_post_id'], $post2['id']);
        $this->assertEquals($decodedJson[1]['user_id'], $user['id']);
    }
}