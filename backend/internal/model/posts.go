package model

import "time"

// Post merepresentasikan struktur tabel 'posts' di database MySQL
type Post struct {
	ID          int       `json:"id" db:"id"`
	Title       string    `json:"title" db:"title"`
	Content     string    `json:"content" db:"content"`
	Category    string    `json:"category" db:"category"`
	CreatedDate time.Time `json:"created_date" db:"created_date"`
	UpdatedDate *time.Time `json:"updated_date" db:"updated_date"`
	Status      string    `json:"status" db:"status"` // Publish | Draft | Thrash
}

type PostReturn struct {
	ID          int       `json:"id" db:"id"`
	Title    string `json:"title" validate:"required,min=20"`
	Content  string `json:"content" validate:"required,min=200"`
	Category string `json:"category" validate:"required,min=3"`
	Status   string `json:"status" validate:"required,oneof=publish draft thrash Publish Draft Thrash"`
}

// PostRequest merepresentasikan payload JSON dari user beserta validasinya
type PostRequest struct {
	Title    string `json:"title" binding:"required,min=20"`
	Content  string `json:"content" binding:"required,min=200"`
	Category string `json:"category" binding:"required,min=3"`
	Status   string `json:"status" binding:"required,oneof=publish draft thrash Publish Draft Thrash"`
}

type PostUpdateRequest struct {
	Title    *string `json:"title" binding:"omitempty,min=20"`
	Content  *string `json:"content" binding:"omitempty,min=200"`
	Category *string `json:"category" binding:"omitempty,min=3"`
	Status   *string `json:"status" binding:"omitempty,oneof=publish draft thrash Publish Draft Thrash"`
}

type ArticleQueryRequest struct {
    Limit   int    `form:"limit"`
    Offset  int    `form:"offset"`
    Status  string `form:"status"`
    Keyword string `form:"keyword"`
}