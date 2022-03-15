<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            BookSeeder::class,
            ChapterSeeder::class,
            CitationSeeder::class,
            CategorySeeder::class,
            PostSeeder::class,
            PermissionsSeeder::class,
            TagSeeder::class,
            PostTagSeeder::class
        ]);
    }
}
