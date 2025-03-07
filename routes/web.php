<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckAuthMiddleware;

Route::get('/', function () {
    return inertia('Home/index');
})->name('home');

Route::group(["middleware" => [CheckAuthMiddleware::class]], function () {
    Route::get("/login", [AuthController::class, "index"])->name('login');
    
    Route::get("/restricted-area", function () {
        return inertia("RestrictedArea/index");
    })->name('RestrictedArea');
});


Route::post("/login", [AuthController::class, "authentication"]);
Route::get("/logout", [AuthController::class, "logout"])->name('logout');