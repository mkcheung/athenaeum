<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user = User::inRandomOrder()->first();
        return [
            'title' => $this->faker->name,
            'author_first_name' => $this->faker->name,
            'author_middle' => $this->faker->name,
            'author_last_name' => $this->faker->name,
            'pages' => $this->faker->numberBetween(0,550),
            'user_id' => $user->id 
        ];
    }
}
