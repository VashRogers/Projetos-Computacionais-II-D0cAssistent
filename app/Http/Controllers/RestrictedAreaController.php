<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;


class RestrictedAreaController extends Controller
{
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();

        return inertia("RestrictedArea/index", [
            'auth' => [
                'name' => $user->name,
                'id' => $user->id,
            ],
        ]);
    }
}
