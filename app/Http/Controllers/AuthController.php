<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
        return inertia("Auth/login");
    }

    public function authentication(LoginRequest $request)
    {

        $credentials = $request->validated();

        if (Auth::attempt($credentials)) {

            return response()->json(['message' => 'Sucesso ao realizar login'], 200);
        } else {
            return response()->json(['password' => true, 'message' => 'Senha incorreta!'], 400);
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }
}
