<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nome'])]
class TipoPapel extends Model
{
    protected $table = 'tipo_papeis';

    /** @use HasFactory<\Database\Factories\TipoPapelFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'nome' => 'string',
        ];
    }
}
