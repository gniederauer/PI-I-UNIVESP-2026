<?php

namespace Database\Seeders;

use App\Models\TipoPapel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoPapelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipos = [
            'Couchê brilho',
            'Couchê fosco',
            'Reciclado',
            'Papel cartão / Kraft',
        ];

        foreach ($tipos as $nome) {
            TipoPapel::factory()->create(['nome' => $nome]);
        }
    }
}
