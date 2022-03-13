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
Route::get('users/showUserBlogPosts', [UserController::class, 'showUserBlogPosts']);
Route::get('users/showAuthors', [UserController::class, 'showAuthors']);
Route::get('posts/show/{id}', [PostController::class, 'show']);

Route::middleware(['api'])->group(function () {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);

    Route::get('tags/getTagsToPosts', [TagController::class, 'getTagsToPosts']);
    Route::resource('tags', TagController::class);
    Route::resource('chapters', ChapterController::class);
    Route::post('citations/assignChapters', [PostController::class, 'getRecentPosts']);
    Route::resource('citations', CitationController::class);
    Route::get('/posts/', [PostController::class, 'index']);
    Route::get('/posts/getUserPosts', [PostController::class, 'getUserPosts']);
    Route::get('/posts/getPostAndDecendants', [PostController::class, 'getPostAndDecendants']);
    Route::resource('posts', PostController::class);
    Route::get('/books/searchByTitle', [BookController::class, 'searchByTitle']);
    Route::get('/books/showUserBooks', [BookController::class, 'showUserBooks']);
    Route::resource('books', BookController::class);
});
