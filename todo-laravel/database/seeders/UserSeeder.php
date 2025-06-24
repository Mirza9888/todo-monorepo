<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create primary user
        User::create([
            'name' => 'Redza',
            'email' => 'redzacs@gmail.com',
            'password' => Hash::make('test1234'),
        ]);

        // Create test users
        User::create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => Hash::make('admin123'),
        ]);

        User::create([
            'name' => 'Demo User',
            'email' => 'demo@test.com',
            'password' => Hash::make('demo123'),
        ]);
    }
}
