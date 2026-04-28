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
        Schema::create('artes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('orcamento_id')->constrained()->cascadeOnDelete();
            $table->boolean('possui_arte')->default(false);
            $table->string('arquivo')->nullable();
            $table->boolean('precisa_criacao')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artes');
    }
};
