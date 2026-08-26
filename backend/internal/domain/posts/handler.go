package posts

import (
	"article-posts-api/internal/helper"
	"article-posts-api/internal/model"
	"article-posts-api/internal/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service}
}

func (h *Handler) CreateArticle(c *gin.Context){
	var req model.PostRequest

	if err := c.ShouldBindJSON(&req); err != nil {
        msg, details := helper.FormatValidationError(err)
        response.Error(c, http.StatusBadRequest, msg, details)
        return
    }

	res, err := h.service.CreateArticle(c.Request.Context(), &req)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	response.Success(c, http.StatusCreated, "Berhasil membuat artikel", res, nil)
}

func (h *Handler) GetArticle(c *gin.Context) {
    var req model.ArticleQueryRequest

    if err := c.ShouldBindQuery(&req); err != nil {
        response.Error(c, http.StatusBadRequest, "Format query tidak valid", nil)
        return
    }

    if req.Limit <= 0 {
        req.Limit = 10
    }
    if req.Offset < 0 {
        req.Offset = 0
    }

    posts, total, err := h.service.GetArticle(c.Request.Context(), req)
    if err != nil {
        response.Error(c, http.StatusInternalServerError, err.Error(), nil)
        return
    }

    response.Success(c, http.StatusOK, "Berhasil mengambil data artikel", gin.H{
        "limit":  req.Limit,
        "offset": req.Offset,
        "total":  total,
        "data":   posts,
    }, nil)
}

func (h *Handler) GetArticleById(c *gin.Context) {
	id := c.Param("id")

	if id == ""{
		response.Error(c, http.StatusBadRequest, "ID artikel tidak boleh kosong", nil)
		return
	}

	item, err := h.service.GetArticleById(c.Request.Context(), id)

	if err != nil{
		response.Error(c, http.StatusInternalServerError, err.Error(), nil)
        return
	}

	response.Success(c, http.StatusOK, "Berhasil mengambil detail artikel", item, nil)
}

func (h *Handler) UpdateArticle(c *gin.Context) {
    id := c.Param("id")
    if id == "" {
        response.Error(c, http.StatusBadRequest, "ID artikel tidak boleh kosong", nil)
        return
    }

    var req model.PostUpdateRequest
   	if err := c.ShouldBindJSON(&req); err != nil {
        msg, details := helper.FormatValidationError(err)
        response.Error(c, http.StatusBadRequest, msg, details)
        return
    }

    updatedArticle, err := h.service.UpdateArticle(c.Request.Context(), id, req)
    if err != nil {
        response.Error(c, http.StatusInternalServerError, err.Error(), nil)
        return
    }

	response.Success(c, http.StatusOK, "Berhasil mengupdate artikel", updatedArticle, nil)
}

func (h *Handler) DeleteArticle(c *gin.Context) {
    id := c.Param("id")
    if id == "" {
        response.Error(c, http.StatusBadRequest, "ID artikel tidak boleh kosong", nil)
        return
    }
    
    err := h.service.DeleteArticle(c.Request.Context(), id)
    if err != nil {
        response.Error(c, http.StatusInternalServerError, "Gagal menghapus artikel: "+err.Error(), nil)
        return
    }

    response.Success(c, http.StatusOK, "Berhasil menghapus artikel", nil, nil)
}