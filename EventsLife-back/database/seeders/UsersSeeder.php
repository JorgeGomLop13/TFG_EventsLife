<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;


class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
		User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
			'password'=> 'test',
			'role' => 'standart',
			'phone' => '111223344'
        ]);
    }
}
