<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['quantidade'])]
class Material extends Model
{
    protected $table = 'materiais';

    /** @use HasFactory<\Database\Factories\MaterialFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<Orcamento>
     */
    public function orcamento(): BelongsTo
    {
        return $this->belongsTo(Orcamento::class);
    }

    /**
     * @return BelongsTo<TipoMaterial>
     */
    public function tipoMaterial(): BelongsTo
    {
        return $this->belongsTo(TipoMaterial::class);
    }

    /**
     * @return BelongsTo<Formato>
     */
    public function formato(): BelongsTo
    {
        return $this->belongsTo(Formato::class);
    }

    /**
     * @return BelongsTo<GramaturaPapel>
     */
    public function gramaturaPapel(): BelongsTo
    {
        return $this->belongsTo(GramaturaPapel::class);
    }

    /**
     * @return BelongsTo<CoresImpressao>
     */
    public function corImpressao(): BelongsTo
    {
        return $this->belongsTo(CoresImpressao::class);
    }

    /**
     * @return BelongsTo<TipoPapel>
     */
    public function tipoPapel(): BelongsTo
    {
        return $this->belongsTo(TipoPapel::class);
    }
}
