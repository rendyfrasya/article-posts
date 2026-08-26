# 📦 Article Posts Projects

Aplikasi Content Management System (CMS) lengkap untuk manajemen artikel blog (Admin Dashboard & Public Preview Blog) yang dibangun menggunakan arsitektur modern berbasis Go dan React.

---

## 🛠️ Tech Stack

### Backend (API)
- **Language:** Go (Golang) 1.20+
- **Web Framework:** Gin Web Framework
- **Database:** MySQL (menggunakan `sqlx` untuk ekstensi standar `database/sql`)
- **Architecture:** Clean Architecture / Domain-Driven Design (`Handler` -> `Service` -> `Repository`)

### Frontend (UI)
- **Framework:** React (via Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios


## 🚀 Panduan Instalasi & Menjalankan Aplikasi

Pastikan sistemmu sudah terinstal Go (1.20+), Node.js (18+), dan Docker.

### 1. Setup & Jalankan Docker

docker compose up -d --build

### 2. Setup & Jalankan Backend (Go)

cd backend

go mod tidy

docker exec -i article_posts_db mysql -uroot -prootpassword article-posts < migrations/init_schema.sql

go run cmd/main.go

### 3. Setup & Jalankan Frontend (React/Vite)

cd frontend

npm install

npm run dev

---

## 📁 Struktur Direktori Proyek

root/
├── backend/
│   ├── cmd/
│   │   └── main.go              # Entry point aplikasi Go
│   ├── migrations/              # Script DDL / SQL Schema & Seeder
│   │   └── init_schema.sql
│   └── internal/
│       ├── config/              # Konfigurasi aplikasi & koneksi database
│       ├── handler/             # HTTP Handler (Gin Framework)
│       ├── repository/          # Database Query (MySQL Dynamic SQL)
│       ├── service/             # Business Logic Layer
│       ├── model/               # Struct (Tabel DB & JSON Payload)
│       ├── response/            # Standar JSON response (Success/Error format)
│       └── router/              # Konfigurasi rute Gin & CORS middleware
│
└── frontend/
    └── src/
        ├── components/          # Komponen UI (Sidebar, dll)
        ├── hooks/               # Custom Hooks (useDashboard, usePreview, dll)
        ├── services/            # Konfigurasi Axios API client
        ├── types/               # TypeScript Interfaces (Article, ApiResponse)
        └── App.tsx              # Router & Layout Utama# article-posts
