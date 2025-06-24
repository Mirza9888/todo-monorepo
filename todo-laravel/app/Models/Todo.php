<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'priority',
        'completed',
        'user_id'
    ];

    protected $casts = [
        'completed' => 'boolean',
        'priority' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 