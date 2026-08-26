// internal/middleware/logger.go
package middleware

import (
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

var jsonLogger *slog.Logger

func init() {
	// 1. Pastikan folder logs/ ada
	logDir := "logs"
	if err := os.MkdirAll(logDir, 0755); err != nil {
		panic(fmt.Sprintf("Gagal membuat folder log: %v", err))
	}

	// 2. Buat nama file berdasarkan timestamp harian (Contoh: logs/app-2026-08-07.log)
	filename := filepath.Join(logDir, fmt.Sprintf("app-%s.log", time.Now().Format("2006-01-02")))

	// 3. Buka file dalam mode Append (tambah ke bawah jika sudah ada)
	file, err := os.OpenFile(filename, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		panic(fmt.Sprintf("Gagal membuka file log: %v", err))
	}

	// 4. Inisiasi slog dengan format JSON mengarah ke multiWriter
	jsonLogger = slog.New(slog.NewJSONHandler(file, nil))
}

// RequestLogger mencatat setiap aktivitas hit API
func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path

		c.Next() // Proses request

		latency := time.Since(start)
		status := c.Writer.Status()

		jsonLogger.Info("API Request",
			slog.String("method", c.Request.Method),
			slog.String("path", path),
			slog.Int("status", status),
			slog.String("latency", latency.String()),
			slog.String("client_ip", c.ClientIP()),
			slog.String("user_agent", c.Request.UserAgent()),
			slog.String("errors", c.Errors.ByType(gin.ErrorTypePrivate).String()),
		)
	}
}