<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\PostController;

Route::post('login', [ApiController::class, 'authenticate']);
Route::post('register', [ApiController::class, 'register']);

Route::get('posts/', 'PostController@index');
Route::get('posts/getRecentPosts', 'PostController@getRecentPosts');
Route::get('posts/getUserPosts', 'PostController@getUserPosts');
Route::get('posts/getPostAndDecendants', 'PostController@getPostAndDecendants');
Route::get('posts/show/{id}', 'PostController@show');
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

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('logout', [ApiController::class, 'logout']);
    Route::get('get_user', [ApiController::class, 'get_user']);
    Route::get('posts', [PostController::class, 'index']);
    Route::get('posts/{id}', [PostController::class, 'show']);
    Route::post('create', [PostController::class, 'store']);
    Route::put('update/{post}',  [PostController::class, 'update']);
    Route::delete('delete/{post}',  [PostController::class, 'destroy']);
});