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
            'author' => $user->full_name,
            'pages' => $this->faker->numberBetween(0,550)
        ];
    }
}
