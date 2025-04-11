<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PdfStoreController;
use App\Http\Controllers\RestrictedAreaController;
use App\Http\Middleware\CheckAuthMiddleware;

Route::get('/', [HomeController::class, "index"])->name('home');

Route::group(["middleware" => [CheckAuthMiddleware::class]], function () {
    Route::get("/login", [AuthController::class, "index"])->name('login');

    Route::group(["prefix" => "restricted-area"], function () { //area restrista
        Route::get("/", [RestrictedAreaController::class, "index"])->name('RestrictedArea');

        Route::get("/pdf-store", [PdfStoreController::class, "index"]);
        Route::post('/pdfs', [PdfStoreController::class, 'store']);
        Route::get('/download/pdf/{id}', [PdfStoreController::class, 'download']);
    });
});


Route::post("/login", [AuthController::class, "authentication"]);
Route::get("/logout", [AuthController::class, "logout"])->name('logout');
