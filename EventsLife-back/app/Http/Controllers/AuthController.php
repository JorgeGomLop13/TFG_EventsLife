<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    //
	public function register(Request $request){
		$validator = Validator::make($request->all(), [
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:6',
			'phone' => 'nullable|string|min:9',
			'address' => 'nullable|string|max:255',
			'role' => 'string|max:255',
		]);

			if ($validator->fails()) {
				return response()->json($validator->errors(), 400);
			}
			$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password),
			'phone' => $request->phone,
			'address' => $request->address,
			'email_verified_at' => now(),
			'remember_token' => Str::random(60),
			'role' => $request->role,
		]);
		
    	return response()->json($user);
	}
}
