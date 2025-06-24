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
            ->orderByRaw("CASE 
                WHEN priority = 'high' THEN 1 
                WHEN priority = 'medium' THEN 2 
                WHEN priority = 'low' THEN 3 
                END")
            ->orderBy('completed', 'asc')
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
            'priority' => $validated['priority'] ?? 'medium',
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
            'priority' => $validated['priority'] ?? $todo->priority,
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

    public function exportTodos(Request $request)
    {
        $todos = $request->user()->todos()->get();
        
        $export = [
            'exported_at' => now()->toISOString(),
            'user_id' => $request->user()->id,
            'todos' => $todos->toArray()
        ];

        return response()->json($export)
            ->header('Content-Disposition', 'attachment; filename="todos_export_' . now()->format('Y-m-d_H-i-s') . '.json"');
    }

    public function importTodos(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:json',
        ]);

        $file = $request->file('file');
        $content = json_decode(file_get_contents($file->path()), true);
        
        if (!isset($content['todos'])) {
            return response()->json(['error' => 'Invalid file format'], 400);
        }

        $importedCount = 0;
        foreach ($content['todos'] as $todoData) {
            if (isset($todoData['title'])) {
                $request->user()->todos()->create([
                    'title' => $todoData['title'],
                    'description' => $todoData['description'] ?? null,
                    'priority' => $todoData['priority'] ?? 'medium',
                    'completed' => false // Always import as incomplete
                ]);
                $importedCount++;
            }
        }

        return response()->json([
            'message' => "Successfully imported {$importedCount} todos",
            'imported_count' => $importedCount
        ]);
    }
} 