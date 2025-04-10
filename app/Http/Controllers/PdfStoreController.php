<?php

namespace App\Http\Controllers;

use App\Models\PdfFile;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PdfStoreController extends Controller
{

    public function index()
    {
        return inertia(
            'RestrictedArea/PdfStore/index'
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
        $pdf->file_path = $filePath; // caso queira salvar o caminho
        $pdf->save();

        return response()->json([
            'message' => 'PDF armazenado com sucesso!',
            'pdf' => $pdf,
        ]);
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
