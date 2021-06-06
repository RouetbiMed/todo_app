<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    function index()
    {
        $user = auth()->user();

        $tasks = $user->tasks()->simplePaginate(10);

        return response()->json(['success' => true, 'data' => $tasks]);
    }

    function show($id)
    {
        $task = Task::where('user_id', auth()->user()->id)->findOrFail($id);
        return response()->json(['success' => true, 'data' => $task]);
    }

    function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $name = $request->get('name');
        $description = $request->get('description');
        $user = auth()->user();

        $task = new Task();
        $task->user()->associate($user);
        $task->name = $name;
        $task->description = $description;
        $task->save();

        return response()->json(['success' => true, 'data' => $task]);
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $task = Task::where('user_id', auth()->user()->id)->findOrFail($id);

        $name = $request->get('name');
        $description = $request->get('description');

        $task->name = $name;
        $task->description = $description;
        $task->save();

        return response()->json(['success' => true, 'data' => $task]);
    }

    function destroy($id)
    {
        $task = Task::where('user_id', auth()->user()->id)->findOrFail($id);
        return response()->json(['success' => $task->delete()]);
    }
}
