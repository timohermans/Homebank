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

Route::apiResource('/transaction', 'TransactionController');
Route::post('/transaction/upload', 'TransactionController@upload');
Route::post('/transaction/assign-category', 'TransactionController@assignCategory');
Route::get('/transaction/:id/similar', 'TransactionController@getSimilar');

Route::middleware('auth:api')
    ->get('/user', function (Request $request) {
        return $request->user();
    });
