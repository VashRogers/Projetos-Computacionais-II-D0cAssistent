<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImagensController;
use App\Http\Controllers\PdfStoreController;
use App\Http\Controllers\RestrictedAreaController;
use App\Http\Controllers\TextController;
use App\Http\Middleware\CheckAuthMiddleware;

Route::get('/', [HomeController::class, "index"])->name('home');

Route::group(["middleware" => [CheckAuthMiddleware::class]], function () {
    Route::get("/login", [AuthController::class, "index"])->name('login');

    Route::group(["prefix" => "restricted-area"], function () { //area restrista
        Route::get("/", [RestrictedAreaController::class, "index"])->name('RestrictedArea');

        //PDFS
        Route::get("/pdf-store", [PdfStoreController::class, "index"]);
        Route::post('/pdfs', [PdfStoreController::class, 'store']);
        Route::get('/download/pdf/{id}', [PdfStoreController::class, 'download']);
        Route::delete("/pdf-store/{id}", [PdfStoreController::class, "destroy"]);

        //Imagens
        Route::get("/imagens-store", [ImagensController::class, "index"]);
        Route::post('/imagens', [ImagensController::class, 'store']);
        Route::get('/download/imagens/{id}', [ImagensController::class, 'download']);

        //texto
        Route::get("/text-store", [TextController::class, "index"]);
        Route::post('/text', [TextController::class, 'store']);
        Route::get('/download/text/{id}', [TextController::class, 'download']);
    });
});


Route::post("/login", [AuthController::class, "authentication"]);
Route::get("/logout", [AuthController::class, "logout"])->name('logout');
