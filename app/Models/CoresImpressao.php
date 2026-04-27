<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['descricao'])]
class CoresImpressao extends Model
{
    protected $table = 'cores_impressao';

    /** @use HasFactory<\Database\Factories\CoresImpressaoFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'descricao' => 'string',
        ];
    }
}
