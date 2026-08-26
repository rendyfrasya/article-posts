// internal/router/router.go
package router

import (
	"article-posts-api/internal/domain/posts"
	"article-posts-api/internal/response"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

// SetupRouter murni hanya mendaftarkan rute API dan Dependency Injection
func SetupRouter(r *gin.Engine, db *sqlx.DB) {

	r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"}, 
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        AllowCredentials: true,
    }))

	// Health Check / Ping
	r.GET("/ping", func(c *gin.Context) {
		response.Success(c, 200, "PONG", nil, nil)
	})

	articleRepo := posts.NewRepository(db)
	articleService := posts.NewService(articleRepo)
	articleHandler := posts.NewHandler(articleService)
	
	// // Routing Group v1
	articleGroup := r.Group("/article")
    {
        articleGroup.POST("", articleHandler.CreateArticle)
        articleGroup.GET("", articleHandler.GetArticle) 
        articleGroup.GET("/:id", articleHandler.GetArticleById)
        articleGroup.PUT("/:id", articleHandler.UpdateArticle)
        articleGroup.DELETE("/:id", articleHandler.DeleteArticle)
    }
	
	// r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}