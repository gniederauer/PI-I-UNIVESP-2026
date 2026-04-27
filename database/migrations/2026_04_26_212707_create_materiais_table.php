<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('materiais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('orcamento_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tipo_material_id')->constrained('tipo_materiais')->cascadeOnDelete();
            $table->foreignId('formato_id')->constrained()->cascadeOnDelete();
            $table->foreignId('gramatura_papel_id')->constrained('gramatura_papeis')->cascadeOnDelete();
            $table->foreignId('cores_impressao_id')->constrained('cores_impressao')->cascadeOnDelete();
            $table->foreignId('tipo_papel_id')->constrained('tipo_papeis')->cascadeOnDelete();
            $table->unsignedInteger('quantidade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materiais');
    }
};
