<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nome'])]
class TipoMaterial extends Model
{
    protected $table = 'tipo_materiais';

    /** @use HasFactory<\Database\Factories\TipoMaterialFactory> */
    use HasFactory;

    /**
     * @return HasMany<Formato>
     */
    public function formatos(): HasMany
    {
        return $this->hasMany(Formato::class);
    }

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
