<?php

namespace Database\Seeders;

use App\Models\Arte;
use App\Models\Cliente;
use App\Models\CoresImpressao;
use App\Models\Endereco;
use App\Models\GramaturaPapel;
use App\Models\Material;
use App\Models\Orcamento;
use App\Models\TipoMaterial;
use App\Models\TipoPapel;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipoMaterial = TipoMaterial::with('formatos')->inRandomOrder()->first();

        $orcamento = Orcamento::factory()
            ->has(Arte::factory())
            ->has(
                Material::factory()
                    ->for($tipoMaterial)
                    ->for($tipoMaterial->formatos->first())
                    ->for(GramaturaPapel::inRandomOrder(rand())->first())
                    ->for(CoresImpressao::inRandomOrder(rand())->first())
                    ->for(TipoPapel::inRandomOrder(rand())->first())
            )->count(5);

        $cliente = Cliente::factory()
            ->has(Endereco::factory())
            ->has($orcamento);

        User::factory()
            ->has($cliente)
            ->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
            ]);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);
    }
}
