package response

import "github.com/gin-gonic/gin"

type Meta struct {
	Page  int `json:"page"`
	Limit int `json:"limit"`
	Total int `json:"total"`
}

type Response struct {
    Success bool        `json:"success"`
    Message string      `json:"message"`
    Data    interface{} `json:"data,omitempty"`
    Meta    interface{} `json:"meta,omitempty"`
    Errors  interface{} `json:"errors,omitempty"`
}

type ErrorDetail struct {
    Field  string `json:"field"`
    Reason string `json:"reason"`
}

func Success(c *gin.Context, statusCode int, message string, data interface{}, meta *Meta) {
	res := gin.H{
		"success": true,
		"message": message,
	}

	if data != nil {
		res["data"] = data
	}
	if meta != nil {
		res["meta"] = meta
	}

	c.JSON(statusCode, res)
}

func Error(c *gin.Context, statusCode int, message string, errors []ErrorDetail) {
	res := gin.H{
		"success": false,
		"message": message,
	}

	if len(errors) > 0 {
		res["errors"] = errors
	}

	c.JSON(statusCode, res)
}