<?php

namespace App\Repositories;

use App\Models\Task;

class TaskRepository
{
    protected $task;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public static function create($user, $name, $description)
    {
        $task = new Task();
        $task->user()->associate($user);
        $task->name = $name;
        $task->description = $description;
        $task->save();

        return $task;
    }

    public function update($name, $description, $status)
    {
        $this->task->name = $name;
        $this->task->description = $description;
        $this->task->completed = (int)$status;
        $this->task->save();

        return $this->task;
    }
}