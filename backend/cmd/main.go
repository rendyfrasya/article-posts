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

// @title Warehouse Management API
// @version 1.0
// @description API untuk mengelola item dan stok di gudang.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8030
// @BasePath /api/v1
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