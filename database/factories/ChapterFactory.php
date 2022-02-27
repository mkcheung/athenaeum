<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChapterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $book = Book::inRandomOrder()->first();
        return [
            'page_begin' => $this->faker->numberBetween(0,59),
            'page_end' => $this->faker->numberBetween(100,440),
            'chapter_number' => $this->faker->numberBetween(1, 42),
            'chapter_title' => $this->faker->unique()->word,
            'book_id' => $book->id
        ];
    }
}
