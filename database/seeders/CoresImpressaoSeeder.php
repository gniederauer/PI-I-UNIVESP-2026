<?php

namespace Database\Seeders;

use App\Models\CoresImpressao;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoresImpressaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cores = [
            '4x0 (colorido frente)',
            '4x4 (colorido frente e verso)',
            '1x0 (preto e branco frente)',
            'Outros',
        ];

        foreach ($cores as $descricao) {
            CoresImpressao::factory()->create(['descricao' => $descricao]);
        }
    }
}
