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
        Schema::create('pdfs', function (Blueprint $table) {
            $table->id();
            $table->string('title');                   // Título do arquivo
            $table->string('file_path');               // Caminho do arquivo
            $table->unsignedBigInteger('size');        // Tamanho do arquivo em bytes
            $table->text('description')->nullable();   // Descrição (opcional)
            $table->unsignedBigInteger('user_id');     // Relacionamento com o usuário
            $table->timestamps();                      // created_at e updated_at

            // Foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pdfs');
    }
};
