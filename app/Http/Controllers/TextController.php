<?php

namespace App\Http\Controllers;

use App\Models\PdfFile;
use App\Models\Text;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class TextController extends Controller
{

    protected $text;

    public function __construct(Text $text)
    {
        $this->text = $text;
    }

    public function index()
    {
        $userTexts = $this->text->getTextFromAuthenticatedUser();

        return inertia(
            'RestrictedArea/TextStore/index',
            [
                "texts" => $userTexts,
            ]
        );
    }


    public function store(Request $request)
    {
        // Validação dos campos
        $validated = $request->validate([
            'text' => 'required|string', // corrigido de 'text' para 'string'
            'title' => 'required|string|max:255',
        ]);

        // Cria e salva o texto
        $text = new Text();
        $text->title = $validated['title'];
        $text->text = $validated['text'];
        $text->user_id = Auth::id(); // associa ao usuário autenticado
        $text->save();

        return response()->json([
            'message' => 'Texto armazenado com sucesso!',
            'text' => $text,
        ]);
    }

    public function update(Request $request, $id)
    {
        $text = Text::findOrFail($id);

        if ($text->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Você não tem permissão para editar este texto.'
            ], Response::HTTP_FORBIDDEN);
        }

        $validated = $request->validate([
            'text' => 'required|string',
            'title' => 'required|string|max:255',
        ]);

        $text->title = $validated['title'];
        $text->text = $validated['text'];
        $text->save();

        return response()->json([
            'message' => 'Texto atualizado com sucesso!',
            'text' => $text,
        ]);
    }

    public function destroy($id)
    {
        // Busca o texto
        $text = Text::findOrFail($id);

        // Verifica se o texto pertence ao usuário autenticado
        if ($text->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Você não tem permissão para deletar este texto.'
            ], Response::HTTP_FORBIDDEN);
        }

        // Deleta o registro do banco
        $text->delete();

        return response()->json([
            'message' => 'Texto deletado com sucesso.'
        ], Response::HTTP_OK);
    }
}
