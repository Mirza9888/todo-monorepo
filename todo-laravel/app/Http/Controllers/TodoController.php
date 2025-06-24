<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Http\Requests\TodoRequest;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TodoController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $todos = $request->user()->todos()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($todos);
    }

    public function show(Todo $todo)
    {
        $this->authorize('view', $todo);
        
        return response()->json($todo);
    }

    public function store(TodoRequest $request)
    {
        $validated = $request->validated();
        
        $todo = $request->user()->todos()->create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'completed' => false
        ]);

        return response()->json($todo, 201);
    }

    public function update(TodoRequest $request, Todo $todo)
    {
        $this->authorize('update', $todo);
        
        $validated = $request->validated();
        
        $todo->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? $todo->description,
        ]);

        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $this->authorize('delete', $todo);
        
        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully']);
    }

    public function toggle(Todo $todo)
    {
        $this->authorize('update', $todo);
        
        $todo->update(['completed' => !$todo->completed]);

        return response()->json($todo);
    }
} 