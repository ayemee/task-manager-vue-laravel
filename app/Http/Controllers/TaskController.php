<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return Task::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,completed',
            'priority' => 'in:low,medium,high',
            'order' => 'integer',
            'user_id' => 'required|exists:users,id'
        ]);

        return Task::create($data);
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->only(['title', 'description', 'status', 'priority', 'order']));
        return response()->json(['message' => 'Task updated.', 'task' => $task]);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted.']);
    }

    // public function reorder(Request $request)
    // {
    //     foreach ($request->tasks as $index => $id) {
    //         Task::where('id', $id)->update(['order' => $index]);
    //     }
    //     return response()->json(['message' => 'Reordered successfully.']);
    // }
}