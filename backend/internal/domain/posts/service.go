package posts

import (
	"article-posts-api/internal/model"
	"context"
	"errors"
	"strings"
)

type Service interface {
    CreateArticle(ctx context.Context, req *model.PostRequest) (*model.PostReturn, error)
    GetArticle(ctx context.Context, req model.ArticleQueryRequest) ([]model.PostReturn, int, error)
    GetArticleById(ctx context.Context, id string) (*model.PostReturn, error)
    UpdateArticle(ctx context.Context, idStr string, req model.PostUpdateRequest) (*model.PostReturn, error)
	DeleteArticle(ctx context.Context, id string) error
}

type service struct {
    repo Repository
}

func NewService(repo Repository) Service {
    return &service{repo}
}

func handleDBError(err error) error {
    if err == nil {
        return nil
    }
    
    errMsg := err.Error()

    if strings.Contains(errMsg, "Data truncated for column 'status'") {
        return errors.New("Status tidak valid. Harap isi kolom status HANYA dengan 'Publish', 'Draft', atau 'Thrash'.")
    }

    if strings.Contains(errMsg, "Data too long") {
        return errors.New("Data teks terlalu panjang. Harap kurangi jumlah karakter pada input Anda.")
    }

    if strings.Contains(errMsg, "cannot be null") {
        return errors.New("Ada data wajib yang kosong. Harap lengkapi semua field yang dibutuhkan.")
    }

    return errors.New("Gagal memproses data. Pastikan format input Anda sudah sesuai.")
}

func (s *service) CreateArticle(ctx context.Context, req *model.PostRequest) (*model.PostReturn, error) {
    post, err := s.repo.CreateArticle(ctx, req)
    if err != nil {
        return nil, handleDBError(err)
    }
    return post, nil
}

func (s *service) GetArticle(ctx context.Context, req model.ArticleQueryRequest) ([]model.PostReturn, int, error) {
    posts, total, err := s.repo.GetArticle(ctx, req)
    if err != nil {
        return nil, 0, err
    }
    return posts, total, nil
}

func (s *service) GetArticleById(ctx context.Context, id string) (*model.PostReturn, error) {
    post, err := s.repo.GetArticleById(ctx, id) 
    if err != nil {
        return nil, errors.New("Data artikel tidak ditemukan. Pastikan ID artikel benar.")
    }

    postReturn := &model.PostReturn{
        Title:    post.Title,
        Content:  post.Content,
        Category: post.Category,
        Status:   post.Status,
    }

    return postReturn, nil
}

func (s *service) UpdateArticle(ctx context.Context, idStr string, req model.PostUpdateRequest) (*model.PostReturn, error) {
    existingArticle, err := s.repo.GetArticleById(ctx, idStr)
    if err != nil {
        return nil, errors.New("Data artikel tidak ditemukan")
    }

    if req.Title != nil {
        existingArticle.Title = *req.Title
    }
    if req.Content != nil {
        existingArticle.Content = *req.Content
    }
    if req.Category != nil {
        existingArticle.Category = *req.Category
    }
    if req.Status != nil {
        existingArticle.Status = *req.Status
    }
    
    err = s.repo.UpdateArticle(ctx, existingArticle)
    if err != nil {
        return nil, handleDBError(err)
    }

    postReturn := &model.PostReturn{
        Title:    existingArticle.Title,
        Content:  existingArticle.Content,
        Category: existingArticle.Category,
        Status:   existingArticle.Status,
    }

    return postReturn, nil
}

func (s *service) DeleteArticle(ctx context.Context, id string) error {
    _, err := s.repo.GetArticleById(ctx, id)
    if err != nil {
        return errors.New("Data artikel tidak ditemukan")
    }

    err = s.repo.DeleteArticle(ctx, id)
    if err != nil {
        return err
    }

    return nil
}