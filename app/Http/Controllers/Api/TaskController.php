<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Repositories\TaskRepository;
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

        $task = TaskRepository::create($user, $name, $description);

        return response()->json(['success' => true, 'data' => $task]);
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'status' => 'required|integer|in:' . implode(',', Task::STATUS)
        ]);

        $foundTask = Task::where('user_id', auth()->user()->id)->findOrFail($id);

        $name = $request->get('name');
        $description = $request->get('description');
        $status = $request->get('status');

        $task = (new TaskRepository($foundTask))->update($name, $description, $status);

        return response()->json(['success' => true, 'data' => $task]);
    }

    function destroy($id)
    {
        $task = Task::where('user_id', auth()->user()->id)->findOrFail($id);
        return response()->json(['success' => $task->delete()]);
    }
}
