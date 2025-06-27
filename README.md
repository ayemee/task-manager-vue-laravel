# Task Management App (Laravel 11 + Vue 3 + Tailwind CSS)

A modern full-stack task management system with drag-and-drop sorting, filtering, and user-based access.

## 🚀 Features

- User Registration & Login (Laravel 11 API + Pinia)
- Task CRUD (Create, Read, Update, Delete)
- Drag-and-Drop Task Reordering
- Priority & Status Filters
- Admin-only Controls & Dashboard
- Scheduled Cleanup (Tasks older than 30 days)
- Tailwind CSS for responsive design
- Vue 3 + Pinia for reactive frontend

## 🛠 Tech Stack

- **Backend:** Laravel 11, MySQL
- **Frontend:** Vue 3, Laravel Mix, Pinia, Tailwind CSS
- **Database:** MySQL

## 📦 Installation

## 🛠 .env
- make sure to change the DB_DATABASE={your database name}

### Backend (Laravel)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

npm install
npm run dev
