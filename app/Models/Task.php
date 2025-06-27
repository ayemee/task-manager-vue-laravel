<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
   protected $fillable = ['title', 'description', 'status', 'priority', 'order', 'user_id'];

   // public function scopeStatus($query, $status)
   // {
   //    return $status ? $query->where('status', $status) : $query;
   // }

   // public function scopePriority($query, $priority)
   // {
   //    return $priority ? $query->where('priority', $priority) : $query;
   // }

   // public function user()
   // {
   //    return $this->belongsTo(User::class);
   // }
}