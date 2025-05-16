<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Text extends Model
{
    use HasFactory;

    protected $table = "text";

    protected $fillable = [
        'title',
        'text',
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
    public function getTextFromAuthenticatedUser()
    {
        return $this->where('user_id', Auth::id())->get();
    }
}
