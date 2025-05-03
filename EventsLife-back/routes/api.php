<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CategoryController;



Route::get('/users',[UserController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);

Route::get('/categories',[CategoryController::class, 'index']);

Route::post('/event',[EventController::class, 'store']);
Route::get('/event/{id}', [EventController::class, 'getByOrganizer']);
Route::delete('/event/{id}', [EventController::class, 'destroy']);
