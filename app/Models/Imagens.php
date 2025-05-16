<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Imagens extends Model
{
    use HasFactory;

    protected $table = "imagens";

    protected $fillable = [
        'title',
        'size',
        'description',
        'file_path',
        'user_id', // adicionado para poder preencher o campo
    ];

    /**
     * Relacionamento: PDF pertence a um usuário
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Busca os PDFs do usuário autenticado
     */
    public function getImagensFromAuthenticatedUser()
    {
        return $this->where('user_id', Auth::id())->get();
    }
}
