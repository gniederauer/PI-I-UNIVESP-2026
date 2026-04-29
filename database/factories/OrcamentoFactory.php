<?php

namespace Database\Factories;

use App\Models\Orcamento;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Orcamento>
 */
class OrcamentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'data_solicitacao' => $this->faker->date(),
            'observacoes' => $this->faker->sentence(),
            'valor_total' => $this->faker->numberBetween(1, 100),
            'status' => $this->faker->numberBetween(1, 4),
        ];
    }
}
