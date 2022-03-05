<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'page_begin',
        'page_end',
        'chapter_number',
        'chapter_title'
    ]; 
 
    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
