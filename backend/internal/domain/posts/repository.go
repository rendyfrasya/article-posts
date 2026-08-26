package posts

import (
	"article-posts-api/internal/model"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/jmoiron/sqlx"
	"golang.org/x/sync/errgroup"
)

type Repository interface {
    CreateArticle(ctx context.Context, req *model.PostRequest) (*model.PostReturn, error)
    GetArticle(ctx context.Context, req model.ArticleQueryRequest) ([]model.PostReturn, int, error)
    GetArticleById(ctx context.Context, id string) (*model.Post, error) 
    UpdateArticle(ctx context.Context, post *model.Post) error
	DeleteArticle(ctx context.Context, id string) error
}

type repository struct {
    db *sqlx.DB
}

func NewRepository(db *sqlx.DB) Repository {
    return &repository{db: db}
}

func (r *repository) CreateArticle(ctx context.Context, req *model.PostRequest) (*model.PostReturn, error) {
    query := `
        INSERT INTO posts (title, content, category, status) 
        VALUES (:title, :content, :category, :status)`

    result, err := r.db.NamedExecContext(ctx, query, req)
    if err != nil {
        return nil, err
    }

    lastID, err := result.LastInsertId()
    if err != nil {
        return nil, err
    }

    var createdPost model.PostReturn
    err = r.db.GetContext(ctx, &createdPost, "SELECT title, content, category, status FROM posts WHERE id = ?", lastID)
    if err != nil {
        return nil, err
    }

    return &createdPost, nil
}

func (r *repository) GetArticle(ctx context.Context, req model.ArticleQueryRequest) ([]model.PostReturn, int, error) {
    var (
        posts []model.PostReturn
        total int
    )

    var conditions []string
    var args []interface{}

    if req.Status != "" {
        conditions = append(conditions, "status = ?")
        args = append(args, req.Status)
    }

    if req.Keyword != "" {
        conditions = append(conditions, "title LIKE ?")
        args = append(args, "%"+req.Keyword+"%") 
    }

    whereClause := ""
    if len(conditions) > 0 {
        whereClause = " WHERE " + strings.Join(conditions, " AND ")
    }

    countQuery := `SELECT COUNT(*) FROM posts` + whereClause
    
    dataQuery := `SELECT id, title, content, category, status FROM posts` + whereClause + ` ORDER BY created_date DESC LIMIT ? OFFSET ?`

    dataArgs := append(args, req.Limit, req.Offset)

    g, ctxGroup := errgroup.WithContext(ctx)

    g.Go(func() error {
        return r.db.GetContext(ctxGroup, &total, countQuery, args...)
    })

    g.Go(func() error {
        return r.db.SelectContext(ctxGroup, &posts, dataQuery, dataArgs...)
    })

    if err := g.Wait(); err != nil {
        return nil, 0, err
    }

    if posts == nil {
        posts = []model.PostReturn{}
    }

    return posts, total, nil
}

func (r *repository) GetArticleById(ctx context.Context, id string) (*model.Post, error) {
    var item model.Post 
    
    query := `
        SELECT 
            id, title, content, category, status 
        FROM posts
        WHERE id = ?
    `
    
    err := r.db.GetContext(ctx, &item, query, id)
    if err != nil {
        if err == sql.ErrNoRows{
            return nil, errors.New("Data artikel tidak ditemukan")
        }
        return nil, err
    }
    
    return &item, nil
}

func (r *repository) UpdateArticle(ctx context.Context, post *model.Post) error {
    query := `
        UPDATE posts 
        SET title = :title, 
            content = :content, 
            category = :category, 
            status = :status,
			updated_date = NOW()
        WHERE id = :id
    `
    
    result, err := r.db.NamedExecContext(ctx, query, post)
    if err != nil {
        return err
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }
    if rowsAffected == 0 {
        return fmt.Errorf("tidak ada data yang diupdate (artikel dengan ID %v tidak ditemukan)", post.ID)
    }

    return nil
}

func (r *repository) DeleteArticle(ctx context.Context, id string) error {
    query := `
        DELETE FROM posts 
        WHERE id = $1
    `

    result, err := r.db.ExecContext(ctx, query, id)
    if err != nil {
        return err
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }
    if rowsAffected == 0 {
        return errors.New("tidak ada data yang dihapus (artikel dengan ID tersebut tidak ditemukan)")
    }

    return nil
}