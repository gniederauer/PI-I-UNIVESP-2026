<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep'])]
class Endereco extends Model
{
    /** @use HasFactory<\Database\Factories\EnderecoFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<Cliente>
     */
    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'rua' => 'string',
            'numero' => 'integer',
            'bairro' => 'string',
            'cidade' => 'string',
            'estado' => 'string',
            'cep' => 'string',
        ];
    }
}
