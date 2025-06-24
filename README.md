# Todo Monorepo

Full-stack todo application with Next.js frontend and Laravel API backend.

## 🏗️ Architecture

This monorepo contains:

- **Frontend**: Next.js (TypeScript) - `/todo-next/`
- **Backend**: Laravel (PHP) - `/todo-laravel/`
- **DevOps**: Docker configuration - `/Docker/` and `docker-compose.yml`

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- PHP 8.3+ (for local development)

### Running with Docker

```bash
# Clone the repository
git clone git@github.com:Mirza9888/todo-monorepo.git
cd todo-monorepo

# Setup SSL certificates for HTTPS (required)
./setup-ssl.sh

# Start all services
docker compose up -d

# Access the applications
# Frontend: https://localhost:8443 (HTTPS)
# Backend API: https://localhost:8443/api (HTTPS)
# Alternative HTTP access: http://localhost:80
```

**Note**: The application now uses HTTPS by default. You may see a browser security warning for the self-signed certificate, which you can safely ignore in development.

### Local Development

#### Backend (Laravel)
```bash
cd todo-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

#### Frontend (Next.js)
```bash
cd todo-next
npm install

# Set the API URL environment variable
export NEXT_PUBLIC_API_URL=https://localhost:8443/api
# or create a .env.local file with:
# NEXT_PUBLIC_API_URL=https://localhost:8443/api

npm run dev
```

## 🔐 Environment Variables

The application requires the following environment variable to be set:

- `NEXT_PUBLIC_API_URL`: The base URL for the API (e.g., `https://localhost:8443/api`)

This variable is configured automatically in Docker, but must be set manually for local development.

## 📁 Project Structure

```
todo-monorepo/
├── todo-next/          # Next.js frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── todo-laravel/       # Laravel backend
│   ├── app/
│   ├── routes/
│   └── composer.json
├── Docker/             # Docker configurations
├── certbot/            # SSL certificates directory
├── setup-ssl.sh       # SSL setup script
├── docker-compose.yml  # Multi-service setup
└── README.md
```

## 🔧 Features

- **Authentication**: JWT-based auth system
- **Todo Management**: CRUD operations for todos
- **Real-time Updates**: Modern UI with React
- **API**: RESTful Laravel API
- **Docker**: Containerized development environment
- **HTTPS**: SSL/TLS encryption for secure communication

## 🌐 Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Laravel 11
- PHP 8.3
- MySQL
- Laravel Sanctum

### DevOps
- Docker
- Docker Compose
- Nginx with SSL/TLS
- Let's Encrypt (Certbot) for SSL certificates

## 📝 License

This project is open source and available under the [MIT License](LICENSE). 