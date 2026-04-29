<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            GramaturaPapelSeeder::class,
            CoresImpressaoSeeder::class,
            TipoPapelSeeder::class,
            TipoMaterialSeeder::class,
            UserSeeder::class,
        ]);
    }
}
