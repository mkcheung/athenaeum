<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CitationController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;


Route::get('/posts/getRecentPosts', [PostController::class, 'getRecentPosts']);
Route::get('/tags/showTags', [TagController::class, 'showTags']);
Route::get('users/showAuthors', [UserController::class, 'showAuthors']);
Route::group(['middleware' => 'api'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);

    Route::resource('tags', TagController::class);
    Route::resource('chapters', ChapterController::class);
    Route::post('citations/assignChapters', [PostController::class, 'getRecentPosts']);
    Route::get('/posts/', [PostController::class, 'index']);
    Route::get('/posts/getUserPosts', [PostController::class, 'getUserPosts']);
    Route::get('/posts/getPostAndDecendants', [PostController::class, 'getPostAndDecendants']);
    Route::get('/posts/show/{id}', [PostController::class, 'show']);
    Route::get('/books/searchByTitle', [BookController::class, 'searchByTitle']);
    Route::get('/books/showUserBooks', [BookController::class, 'showUserBooks']);
    Route::resource('books', BookController::class);
});

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