<?php

namespace App\Http\Controllers;

use App\Models\Imagens;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Illuminate\Support\Str;

class ImagensController extends Controller
{
    protected $imagens;

    public function __construct(Imagens $imagens)
    {
        $this->imagens = $imagens;
    }

    public function index()
    {
        $userImages = $this->imagens->getImagensFromAuthenticatedUser();

        return inertia(
            'RestrictedArea/ImageStore/index',
            [
                "imagens" => $userImages,
            ]
        );
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'image_file' => 'required|file',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $file = $request->file('image_file');
        $filePath = $file->store('imagens', 'public');

        $imagem = new Imagens();
        $imagem->title = $validated['title'];
        $imagem->size = $file->getSize(); // em bytes
        $imagem->description = $validated['description'] ?? null;
        $imagem->file_path = $filePath;
        $imagem->user_id = Auth::id(); // associa ao usuário autenticado
        $imagem->save();

        return response()->json([
            'message' => 'Imagem armazenado com sucesso!',
            'imagem' => $imagem,
        ]);
    }

    public function destroy($id)
    {
        // Busca o PDF
        $imagem = Imagens::findOrFail($id);

        // Verifica se o imagem pertence ao usuário autenticado
        if ($imagem->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Você não tem permissão para deletar esta Imagem.'
            ], Response::HTTP_FORBIDDEN);
        }

        // Remove o arquivo físico se existir
        if (Storage::disk('public')->exists($imagem->file_path)) {
            Storage::disk('public')->delete($imagem->file_path);
        }

        // Deleta o registro no banco
        $imagem->delete();

        return response()->json([
            'message' => 'Imagem deletada com sucesso.'
        ], Response::HTTP_OK);
    }

    public function download($id)
    {
        // Busca o registro no banco de dados
        $imagem = Imagens::findOrFail($id);

        // Verifica se o arquivo existe no storage
        if (!Storage::disk('public')->exists($imagem->file_path)) {
            return response()->json([
                'message' => 'Arquivo não encontrado.',
            ], Response::HTTP_NOT_FOUND);
        }

        // Caminho completo do arquivo
        $path = Storage::disk('public')->path($imagem->file_path);

        // Obtém a extensão real do arquivo
        $extension = pathinfo($path, PATHINFO_EXTENSION);

        // Determina o tipo MIME
        $mimeType = Storage::disk('public')->mimeType($imagem->file_path);

        // Nome do arquivo para download (mantendo a extensão real)
        $fileName = $imagem->title . '.' . $extension;

        // Retorna o arquivo com o cabeçalho apropriado
        return FacadeResponse::download($path, $fileName, [
            'Content-Type' => $mimeType,
        ]);
    }
}
