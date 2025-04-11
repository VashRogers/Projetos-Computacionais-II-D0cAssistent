<?php

namespace App\Http\Controllers;

use App\Models\PdfFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class PdfStoreController extends Controller
{

    protected $pdfFiles;

    public function __construct(PdfFile $pdfFiles)
    {
        $this->pdfFiles = $pdfFiles;
    }

    public function index()
    {
        $userPdfs = $this->pdfFiles->getPdfsFromAuthenticatedUser();

        return inertia(
            'RestrictedArea/PdfStore/index',
            [
                "pdfs" => $userPdfs,
            ]
        );
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'pdf_file' => 'required|file|mimes:pdf',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $file = $request->file('pdf_file');
        $filePath = $file->store('pdfs', 'public');

        $pdf = new PdfFile();
        $pdf->title = $validated['title'];
        $pdf->size = $file->getSize(); // em bytes
        $pdf->description = $validated['description'] ?? null;
        $pdf->file_path = $filePath;
        $pdf->user_id = Auth::id(); // associa ao usuário autenticado
        $pdf->save();

        return response()->json([
            'message' => 'PDF armazenado com sucesso!',
            'pdf' => $pdf,
        ]);
    }

    public function destroy($id)
    {
        // Busca o PDF
        $pdf = PdfFile::findOrFail($id);

        // Verifica se o PDF pertence ao usuário autenticado
        if ($pdf->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Você não tem permissão para deletar este PDF.'
            ], Response::HTTP_FORBIDDEN);
        }

        // Remove o arquivo físico se existir
        if (Storage::disk('public')->exists($pdf->file_path)) {
            Storage::disk('public')->delete($pdf->file_path);
        }

        // Deleta o registro no banco
        $pdf->delete();

        return response()->json([
            'message' => 'PDF deletado com sucesso.'
        ], Response::HTTP_OK);
    }

    public function download($id)
    {
        // Busca o registro no banco de dados
        $pdf = PdfFile::findOrFail($id);

        // Verifica se o arquivo existe no storage
        if (!Storage::disk('public')->exists($pdf->file_path)) {
            return response()->json([
                'message' => 'Arquivo não encontrado.',
            ], Response::HTTP_NOT_FOUND);
        }

        // Retorna o download
        return Storage::disk('public')->download($pdf->file_path, $pdf->title . '.pdf');
    }
}
