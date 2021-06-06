<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed'
        ]);

        $name = $request->get('name');
        $email = $request->get('email');
        $password = $request->get('password');

        $user = new \App\Models\User();
        $user->name = $name;
        $user->email = $email;
        $user->password = bcrypt($password);
        $user->save();

        return response()->json(['success' => true, 'token' => $user->createToken('auth_token')->plainTextToken]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        if (!auth()->attempt($credentials)) {
            return response()->json(['success' => false, 'message' => 'credentials not match'], 401);
        }

        return response()->json(['success' => true, 'token' => auth()->user()->createToken('auth_token')->plainTextToken]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json(['success' => true, 'message' => 'tokens revoked']);
    }
}
