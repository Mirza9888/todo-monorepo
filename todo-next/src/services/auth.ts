import api from '@/lib/axios';

export const authService = {
    async login(email: string, password: string) {
        const response = await api.post('/login', {
            email,
            password
        });
        return response.data;
    },

    async logout() {
        const response = await api.get('/logout');
        return response.data;
    }
}; 