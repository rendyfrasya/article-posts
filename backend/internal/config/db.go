// internal/config/db.go
package config

import (
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

func ConnectDB() *sqlx.DB {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		user, password, host, port, dbname)

	db, err := sqlx.Connect("mysql", dsn)
	if err != nil {
		log.Fatalf("Gagal membuka koneksi DB: %v", err)
	}

	fmt.Println("Berhasil terhubung ke database MySQL dengan sqlx!")
	return db
}