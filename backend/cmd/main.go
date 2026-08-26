// cmd/main.go
package main

import (
	"article-posts-api/internal/config"
	"article-posts-api/internal/middleware"
	"article-posts-api/internal/router"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// 1. Load Environment Variables
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: File .env tidak ditemukan")
	}

	// 2. Koneksi Database
	db := config.ConnectDB()
	defer db.Close()

	// 3. Inisiasi Gin Engine & Pasang Middleware di sini
	r := gin.New()
	r.Use(middleware.RequestLogger())
	r.Use(middleware.ErrorHandler())
	r.Use(gin.Recovery())

	// 4. Daftarkan Rute via Router Package
	router.SetupRouter(r, db)

	// 5. Jalankan Server
	port := ":8030"
	log.Printf("🚀 Server berjalan di port %s", port)
	if err := r.Run(port); err != nil {
		log.Fatalf("Gagal menjalankan server: %v", err)
	}
}