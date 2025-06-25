'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { todoService } from '@/services/todo';
import React from 'react';

interface Todo {
  id: number;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export default function DashboardView() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState({ title: '', priority: 'medium' as 'low' | 'medium' | 'high' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTodo, setEditingTodo] = useState({ title: '', priority: 'medium' as 'low' | 'medium' | 'high' });

  // Helper function for sorting todos
  const sortTodos = (todoList: Todo[]): Todo[] => {
    return todoList.sort((a: Todo, b: Todo) => {
      // Sort incomplete todos first
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then sort by priority
      const priorityOrder: { [key: string]: number } = { high: 1, medium: 2, low: 3 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      // Finally sort by creation date (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getTodos();
      setTodos(sortTodos(data));
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const todo = await todoService.createTodo(newTodo);
      setTodos(prev => sortTodos([todo, ...prev]));
      setNewTodo({ title: '', priority: 'medium' });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoService.toggleTodo(id);
      setTodos(prev => {
        const updated = prev.map(todo => 
          todo.id === id ? updatedTodo : todo
        );
        return sortTodos(updated);
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTodo({ title: todo.title, priority: todo.priority });
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingTodo.title.trim()) return;

    try {
      const updatedTodo = await todoService.updateTodo(editingId, editingTodo);
      setTodos(prev => {
        const updated = prev.map(todo => 
          todo.id === editingId ? updatedTodo : todo
        );
        return sortTodos(updated);
      });
      setEditingId(null);
      setEditingTodo({ title: '', priority: 'medium' });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTodo({ title: '', priority: 'medium' });
  };

  const handleExport = async () => {
    try {
      const data = await todoService.exportTodos();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `todos_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting todos:', error);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await todoService.importTodos(file);
      await fetchTodos(); // Refresh todos after import with sorting
      e.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Error importing todos:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200 ring-red-500/20';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20';
      case 'low': return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 ring-gray-500/20';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg font-medium text-gray-600">Loading your shopping list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Navigation */}
      <nav className="glass-ultra border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="text-white font-bold text-xl">🛒</span>
              </div>
              <div>
                <h1 className="text-2xl font-poppins font-bold heading-gradient text-shadow-sm">
                  Shopping Todo
                </h1>
                <p className="text-sm text-gray-600 font-medium">Smart Shopping List Manager</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-500">Welcome back,</p>
                <p className="text-lg font-semibold text-gray-800 font-poppins">{user.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold heading-gradient text-shadow mb-4">
            My Shopping List
          </h2>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Organize your shopping efficiently with priority-based task management
          </p>
        </div>

        {/* Enhanced Action Buttons Section */}
        <div className="card-modern max-w-2xl mx-auto mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">Quick Actions</h3>
            <p className="text-gray-600">Manage your shopping list data</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleExport}
              className="btn-modern flex items-center gap-3 text-base font-semibold min-w-[160px] justify-center"
            >
              <span className="text-xl">📤</span>
              Export JSON
            </button>
            <label className="btn-outline-modern flex items-center gap-3 text-base font-semibold min-w-[160px] justify-center cursor-pointer">
              <span className="text-xl">📥</span>
              Import JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Enhanced Add Todo Form */}
        <div className="card-modern max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-poppins font-bold text-gray-800 mb-3">Add New Product</h3>
            <p className="text-gray-600 text-lg">What would you like to add to your shopping list?</p>
          </div>
          
          <form onSubmit={handleAddTodo} className="form-section">
            <div className="form-grid">
              <div className="md:col-span-2 form-group">
                <label className="form-label text-base">
                  <span className="flex items-center gap-2">
                    🛍️ <strong>Product Name</strong>
                  </span>
                </label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter product name (e.g., Organic Apples, Whole Wheat Bread...)"
                  className="input-modern text-base"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label text-base">
                  <span className="flex items-center gap-2">
                    ⭐ <strong>Priority Level</strong>
                  </span>
                </label>
                <select
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                  className="input-modern text-base"
                >
                  <option value="high">🔴 High Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="low">🟢 Low Priority</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="btn-modern text-lg px-12 py-4 flex items-center gap-3 font-bold min-w-[200px] justify-center"
              >
                <span className="text-2xl">➕</span>
                Add to List
              </button>
            </div>
          </form>
        </div>

        {/* Enhanced Todos Table */}
        <div className="card-modern">
          {loading ? (
            <div className="p-16 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <p className="mt-6 text-lg font-medium text-gray-600">Loading your items...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-8xl mb-6">🛒</div>
              <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-3">Your list is empty</h3>
              <p className="text-lg text-gray-600 mb-6">Start by adding your first shopping item above!</p>
              <div className="text-4xl">✨</div>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="px-6 py-6 border-b border-gray-200/60 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-poppins font-bold text-gray-800 mb-1">🛍️ Shopping Items</h3>
                    <p className="text-sm text-gray-600 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {todos.filter(t => !t.completed).length} remaining
                      </span>
                      <span className="mx-2">•</span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        {todos.filter(t => t.completed).length} completed
                      </span>
                    </p>
                  </div>
                  <div className="text-3xl">📋</div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50/90 to-gray-100/90 backdrop-blur-sm">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                          ✓ Status
                        </span>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                          🛍️ Product Name
                        </span>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                          ⭐ Priority Level
                        </span>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                          📅 Date Added
                        </span>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                          ⚙️ Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/30 divide-y divide-gray-200/50">
                    {todos.map((todo, index) => {
                      // Check if previous task was incomplete and current is complete
                      const isFirstCompleted = todo.completed && 
                        (index === 0 || !todos[index - 1]?.completed);
                      
                      return (
                        <React.Fragment key={todo.id}>
                          {/* Separator between active and completed todos */}
                          {isFirstCompleted && todos.some(t => !t.completed) && (
                            <tr>
                              <td colSpan={5} className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="flex-grow border-t-2 border-gray-300"></div>
                                  <span className="flex-shrink mx-6 text-gray-600 text-sm font-semibold bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-full shadow-sm">
                                    ✅ Completed Items ({todos.filter(t => t.completed).length})
                                  </span>
                                  <div className="flex-grow border-t-2 border-gray-300"></div>
                                </div>
                              </td>
                            </tr>
                          )}
                          
                          <tr 
                            className={`transition-all duration-500 hover:bg-white/60 ${
                              todo.completed 
                                ? 'opacity-60 bg-gray-50/30' 
                                : 'hover:bg-blue-50/40 hover:scale-[1.01]'
                            } animate-fadeInUp`}
                            style={{ 
                              animationDelay: `${index * 100}ms`,
                            }}
                          >
                            <td className="px-6 py-5 whitespace-nowrap">
                              <button
                                onClick={() => handleToggleTodo(todo.id)}
                                className={`w-7 h-7 rounded-full border-2 transition-all duration-300 hover:scale-110 flex items-center justify-center ${
                                  todo.completed 
                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg hover:bg-emerald-600' 
                                    : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                                }`}
                              >
                                {todo.completed && <span className="text-sm font-bold">✓</span>}
                              </button>
                            </td>
                            <td className="px-6 py-5">
                              {editingId === todo.id ? (
                                <input
                                  type="text"
                                  value={editingTodo.title}
                                  onChange={(e) => setEditingTodo(prev => ({ ...prev, title: e.target.value }))}
                                  className="input-modern text-base font-medium"
                                  autoFocus
                                />
                              ) : (
                                <span className={`font-semibold text-base transition-all duration-300 ${
                                  todo.completed 
                                    ? 'line-through text-gray-500' 
                                    : 'text-gray-800'
                                }`}>
                                  {todo.title}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              {editingId === todo.id ? (
                                <select
                                  value={editingTodo.priority}
                                  onChange={(e) => setEditingTodo(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                                  className="input-modern text-sm"
                                >
                                  <option value="high">🔴 High</option>
                                  <option value="medium">🟡 Medium</option>
                                  <option value="low">🟢 Low</option>
                                </select>
                              ) : (
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border-2 ring-2 ${getPriorityColor(todo.priority)} ${
                                  todo.completed ? 'opacity-50' : ''
                                } transition-all duration-300`}>
                                  <span className="mr-1.5">{getPriorityIcon(todo.priority)}</span>
                                  {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-500">
                              {new Date(todo.created_at).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                              {editingId === todo.id ? (
                                <div className="flex gap-3">
                                  <button
                                    onClick={handleSaveEdit}
                                    className="table-action-save flex items-center gap-2"
                                  >
                                    <span>✓</span> Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="table-action-cancel flex items-center gap-2"
                                  >
                                    <span>✕</span> Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex gap-3">
                                  <button
                                    onClick={() => handleEditTodo(todo)}
                                    className="table-action-edit flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                                    disabled={todo.completed}
                                  >
                                    <span>✏️</span> Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="table-action-delete flex items-center gap-2"
                                  >
                                    <span>🗑️</span> Delete
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-interactive text-center">
            <div className="text-3xl font-poppins font-bold text-gray-800 mb-2">{todos.length}</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Items</div>
            <div className="mt-2 text-2xl">📝</div>
          </div>
          <div className="card-interactive text-center">
            <div className="text-3xl font-poppins font-bold text-emerald-600 mb-2">{todos.filter(t => t.completed).length}</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Completed</div>
            <div className="mt-2 text-2xl">✅</div>
          </div>
          <div className="card-interactive text-center">
            <div className="text-3xl font-poppins font-bold text-blue-600 mb-2">{todos.filter(t => !t.completed).length}</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Remaining</div>
            <div className="mt-2 text-2xl">⏳</div>
          </div>
          <div className="card-interactive text-center">
            <div className="text-3xl font-poppins font-bold text-red-600 mb-2">{todos.filter(t => t.priority === 'high' && !t.completed).length}</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">High Priority</div>
            <div className="mt-2 text-2xl">🔴</div>
          </div>
        </div>
      </main>
    </div>
  );
} 