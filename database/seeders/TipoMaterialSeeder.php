<?php

namespace Database\Seeders;

use App\Models\Formato;
use App\Models\TipoMaterial;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoMaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tiposComFormatos = [
            'Cartão de visita' => ['90x50mm', '85x55mm', 'Outros'],
            'Folder' => ['A3', 'A4', 'A5', 'Outros'],
            'Flyer' => ['A6 (10,5 x 14,8 cm)', 'A5 (14,8 x 21 cm)', 'A4 (21 x 29,7 cm)', 'Outros'],
            'Adesivo' => ['5x7 cm', '10x15 cm', '8x12 cm', 'Outros', '5x5 cm', '10x10 cm'],
            'Envelope' => ['DL (Ofício)', 'A4 (Saco)', 'A5', 'Outros'],
            'Folhetos' => ['A6', 'A5', 'A4', 'A3', 'Outros'],
        ];

        foreach ($tiposComFormatos as $tipo => $formatos) {
            $tipoMaterial = TipoMaterial::factory()->create(['nome' => $tipo]);

            foreach ($formatos as $descricao) {
                Formato::factory()->create([
                    'tipo_material_id' => $tipoMaterial->id,
                    'descricao' => $descricao,
                ]);
            }
        }
    }
}
