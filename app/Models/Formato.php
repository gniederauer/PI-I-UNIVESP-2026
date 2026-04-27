<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['tipo_material_id', 'descricao'])]
class Formato extends Model
{
    /** @use HasFactory<\Database\Factories\FormatoFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<TipoMaterial>
     */
    public function tipoMateriais(): BelongsTo
    {
        return $this->belongsTo(TipoMaterial::class);
    }

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
