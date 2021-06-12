<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Task
 * @property int id
 * @property string name
 * @property string description
 * @property int completed
 *
 * @package App\Models
 */
class Task extends Model
{
    use HasFactory;

    const STATUS = [
        'ongoing' => 0,
        'completed' => 1,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
