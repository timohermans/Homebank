<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('/category', 'CategoryController');
Route::post('/category', 'CategoryController@store');

Route::apiResource('/transaction', 'TransactionController');
Route::post('/transaction/upload', 'TransactionController@upload');

Route::middleware('auth:api')
    ->get('/user', function (Request $request) {
        return $request->user();
    });
