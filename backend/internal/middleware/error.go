package middleware

import (
	"article-posts-api/internal/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ErrorHandler memusatkan pengolahan error menjadi format standar
func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next() // Biarkan request berjalan ke handler tujuan terlebih dahulu

		// Setelah handler selesai, cek apakah ada error yang dilempar
		if len(c.Errors) > 0 {
			err := c.Errors.Last()
			
			// Ambil status code yang diset di handler, default ke 500 jika tidak ada
			status := c.Writer.Status()
			if status == http.StatusOK {
				status = http.StatusInternalServerError
			}
			response.Error(c, status, err.Error(), nil)
		}
	}
}