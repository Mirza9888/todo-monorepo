import { authService } from './auth';
import Cookies from 'js-cookie';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is required');
}

interface Todo {
  id: number;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface CreateTodoData {
  title: string;
  priority: 'low' | 'medium' | 'high';
  description?: string;
}

interface UpdateTodoData {
  title: string;
  priority: 'low' | 'medium' | 'high';
  description?: string;
}

const getAuthHeaders = () => {
  const token = Cookies.get('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  };
};

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE}/todos`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    return response.json();
  },

  async createTodo(data: CreateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create todo');
    }

    return response.json();
  },

  async updateTodo(id: number, data: UpdateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }

    return response.json();
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },

  async toggleTodo(id: number): Promise<Todo> {
    const response = await fetch(`${API_BASE}/todos/${id}/toggle`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle todo');
    }

    return response.json();
  },

  async exportTodos(): Promise<any> {
    const response = await fetch(`${API_BASE}/todos/export`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to export todos');
    }

    return response.json();
  },

  async importTodos(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const token = Cookies.get('token');
    const response = await fetch(`${API_BASE}/todos/import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to import todos');
    }

    return response.json();
  },
}; 