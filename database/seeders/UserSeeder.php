<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                "name" => "Wise",
                "first_name" => "Socratic",
                "last_name" => "Epistemologist",
                "email" => "wise@gmail.com",
                "password" => Hash::make(123456),
                "is_admin" => true
            ],
            [
                "name" => "Apprentice",
                "first_name" => "Padawan",
                "last_name" => "Learner",
                "email" => "apprentice@gmail.com",
                "password" => Hash::make(123456),
                "is_admin" => true
            ],
            [
                "name" => "Listener",
                "first_name" => "Wise",
                "last_name" => "Listener",
                "email" => "listener@email.com",
                "password" => Hash::make(123456),
                "is_admin" => false
            ],
        ];

        foreach ($users as $user) {
            \App\Models\User::create($user);
        }
    }
}
