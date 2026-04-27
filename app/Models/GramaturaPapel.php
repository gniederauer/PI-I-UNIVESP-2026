<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['gramatura'])]
class GramaturaPapel extends Model
{
    protected $table = 'gramatura_papeis';

    /** @use HasFactory<\Database\Factories\GramaturaPapelFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'gramatura' => 'string',
        ];
    }
}
