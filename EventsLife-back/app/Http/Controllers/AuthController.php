<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
	public function register(Request $request){
		$validator = Validator::make($request->all(), [
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:6',
			'phone' => 'string|min:9'
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors(), 400);
		}
		if ($request->phone) {
			$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password),
			'phone' => $request->phone,
		]);
		}else{
			$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password),
		]);
		}

		return response()->json(['message' => 'Usuario registrado correctamente', 'user' => $user], 201);
	}
}
