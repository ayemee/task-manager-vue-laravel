<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
   protected $fillable = ['title', 'description', 'status', 'priority', 'order', 'user_id'];
}
