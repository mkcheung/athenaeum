<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class CitationFactory extends Factory
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
            'page' => $this->faker->numberBetween(1,300),
            'chapter' => $book->load('chapters')->first()->id, 
            'content' => $this->faker->text(100),
            'book_id' => $book->id
        ];
    }
}
