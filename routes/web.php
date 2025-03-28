<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RestrictedAreaController;
use App\Http\Middleware\CheckAuthMiddleware;

Route::get('/', [HomeController::class, "index"])->name('home');

Route::group(["middleware" => [CheckAuthMiddleware::class]], function () {
    Route::get("/login", [AuthController::class, "index"])->name('login');

    Route::get("/restricted-area", [RestrictedAreaController::class, "index"])->name('RestrictedArea');
});


Route::post("/login", [AuthController::class, "authentication"]);
Route::get("/logout", [AuthController::class, "logout"])->name('logout');
