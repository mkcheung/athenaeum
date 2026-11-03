<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user = User::inRandomOrder()->first();
        $category = Category::inRandomOrder()->first();
        return [
            'title' => $this->faker->unique()->word,
            'slug' => $this->faker->unique()->word,
            'content' => $this->faker->text(200),
            'published' => $this->faker->boolean(),
            'category_id' => $category->id,
            'user_id' => $user->id,
        ];
    }
}
