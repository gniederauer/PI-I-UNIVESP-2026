<?php

namespace Database\Seeders;

use App\Models\GramaturaPapel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GramaturaPapelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gramaturas = [
            '90g',
            '150g',
            '250g',
            '300g',
            'Outro',
        ];

        foreach ($gramaturas as $gramatura) {
            GramaturaPapel::factory()->create(['gramatura' => $gramatura]);
        }
    }
}
