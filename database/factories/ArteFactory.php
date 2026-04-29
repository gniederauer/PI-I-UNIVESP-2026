<?php

namespace Database\Factories;

use App\Models\Arte;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Arte>
 */
class ArteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'possui_arte' => $this->faker->boolean(),
            'precisa_criacao' => $this->faker->boolean(),
            'arquivo' => $this->faker->filePath(),
        ];
    }
}
