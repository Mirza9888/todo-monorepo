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

# Start all services
docker-compose up -d

# Access the applications
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

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
npm run dev
```

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
├── docker-compose.yml  # Multi-service setup
└── README.md
```

## 🔧 Features

- **Authentication**: JWT-based auth system
- **Todo Management**: CRUD operations for todos
- **Real-time Updates**: Modern UI with React
- **API**: RESTful Laravel API
- **Docker**: Containerized development environment

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
- Nginx

## 📝 License

This project is open source and available under the [MIT License](LICENSE). 