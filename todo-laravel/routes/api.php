<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\TodoController;

Route::post('/login', [LoginController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [LoginController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Todo routes
    Route::prefix('todos')->group(function () {
        Route::get('', [TodoController::class, 'index']);
        Route::get('/{todo}', [TodoController::class, 'show']);
        Route::post('', [TodoController::class, 'store']);
        Route::put('/{todo}', [TodoController::class, 'update']);
        Route::delete('/{todo}', [TodoController::class, 'destroy']);
        Route::patch('/{todo}/toggle', [TodoController::class, 'toggle']);
    });
}); 