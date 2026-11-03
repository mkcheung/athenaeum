<?php

namespace Database\Seeders;

use App\Models\Citation;
use Illuminate\Database\Seeder;

class CitationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Citation::factory(50)->create();
    }
}
