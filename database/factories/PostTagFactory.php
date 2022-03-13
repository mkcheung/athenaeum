<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Tag;

use Illuminate\Database\Eloquent\Factories\Factory;

class PostTagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $tag = Tag::inRandomOrder()->first();
        $post = Post::inRandomOrder()->first();
        return [
            "post_id" => $post->id,
            "tag_id" => $tag->id
        ];
    }
}
