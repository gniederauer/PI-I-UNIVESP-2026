<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['possui_arte', 'arquivo', 'precisa_criacao'])]
class Arte extends Model
{
    /** @use HasFactory<\Database\Factories\ArteFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<Orcamento>
     */
    public function orcamento(): BelongsTo
    {
        return $this->belongsTo(Orcamento::class);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'possui_arte' => 'boolean',
            'arquivo' => 'string',
            'precisa_criacao' => 'boolean',
        ];
    }
}
