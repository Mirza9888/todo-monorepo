# Todo Monorepo - Full-Stack Shopping List Application

A modern, responsive shopping list application built with Next.js and Laravel, featuring real-time updates, secure authentication, and a polished user interface.

## 🎯 About This Project

This project demonstrates full-stack development skills using modern technologies. It's a complete todo/shopping list application that showcases:

- **Frontend Development**: Modern React with Next.js 14, TypeScript, and Tailwind CSS
- **Backend Development**: RESTful API with Laravel 11, MySQL, and JWT authentication
- **DevOps & Deployment**: Docker containerization with SSL/HTTPS configuration
- **UI/UX Design**: Responsive design with modern glassmorphism effects and smooth animations

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

**Note**: The application uses HTTPS by default with self-signed certificates. You may see a browser security warning in development, which can be safely ignored.

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

The application requires the following environment variable:

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

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based authentication system with Laravel Sanctum
- **📝 Todo Management**: Full CRUD operations with priority levels and status tracking
- **📱 Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **🎨 Modern UI**: Glassmorphism effects, smooth animations, and gradient backgrounds
- **📊 Data Visualization**: Real-time statistics and progress tracking
- **📤 Data Management**: Import/Export functionality for todo lists
- **🔒 HTTPS Security**: SSL/TLS encryption for all communications
- **🐳 Containerized**: Docker setup for easy deployment and development

## 🌐 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Laravel 11** - PHP web application framework
- **PHP 8.3** - Modern PHP with latest features
- **MySQL** - Relational database
- **Laravel Sanctum** - API authentication

### DevOps
- **Docker & Docker Compose** - Containerization
- **Nginx with SSL/TLS** - Web server with HTTPS
- **Certbot** - SSL certificate management

## 💡 Development Highlights

This project showcases several advanced development concepts:

- **Clean Architecture**: Separation of concerns with service layers
- **Type Safety**: Full TypeScript implementation on the frontend
- **Modern React Patterns**: Hooks, context, and functional components
- **RESTful API Design**: Well-structured API endpoints with proper HTTP methods
- **Security Best Practices**: CORS configuration, HTTPS, and secure authentication
- **Responsive Design**: Mobile-first approach with modern CSS techniques
- **Performance Optimization**: Lazy loading, efficient state management

## 📝 License

This project is open source and available under the [MIT License](LICENSE). 