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

            return redirect()->route('RestrictedArea');
        } else {
            return redirect()->route('login')->with('error', 'Usuário ou senha inválidos');
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }
}
