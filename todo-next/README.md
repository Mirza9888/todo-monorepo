# Shopping Todo Frontend - Next.js Application

Modern, responsive frontend for the Shopping Todo application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Features

- **Modern UI Design**: Glassmorphism effects with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Real-time Updates**: Dynamic todo management with instant feedback
- **Priority System**: Color-coded priority levels (High, Medium, Low)
- **Data Management**: Import/Export functionality for todo lists
- **Secure Authentication**: JWT-based login with protected routes

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your API URL:
# NEXT_PUBLIC_API_URL=https://localhost:8443/api

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **React Hooks** - Modern state management

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router pages
├── components/         # Reusable UI components
├── contexts/          # React Context providers
├── lib/               # Utility functions and configurations
├── sections/          # Page-specific components
│   ├── dashboard/     # Main todo dashboard
│   └── login/         # Authentication forms
└── services/          # API service layers
```

## 🎯 Key Components

- **Dashboard View**: Main todo management interface with sorting and filtering
- **Login View**: Secure authentication with modern UI
- **Todo Service**: API integration layer for all todo operations
- **Auth Context**: Global authentication state management

## 🚢 Deployment

The application is containerized and can be deployed using Docker:

```bash
# Build for production
npm run build

# Start production server
npm start
```

For containerized deployment, see the main project README.

## 📝 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_API_URL` - Backend API base URL

## 🔗 Related

This frontend works with the Laravel backend located in `../todo-laravel/`.
