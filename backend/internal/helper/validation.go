package helper

import (
	"article-posts-api/internal/response"
	"errors"

	"github.com/go-playground/validator/v10"
)

func FormatValidationError(err error) (string, []response.ErrorDetail) {
    var ve validator.ValidationErrors
    
    if errors.As(err, &ve) {
        var errorDetails []response.ErrorDetail
        
        for _, fe := range ve {
            var errorMsg string

            switch fe.Tag() {
            case "required":
                errorMsg = "Kolom ini wajib diisi"
            case "min":
                errorMsg = "Karakter terlalu pendek (minimal " + fe.Param() + " karakter)"
            case "oneof":
                errorMsg = "Nilai tidak valid (harus salah satu dari: " + fe.Param() + ")"
            default:
                errorMsg = "Format tidak valid (" + fe.Tag() + ")"
            }

            errorDetails = append(errorDetails, response.ErrorDetail{
                Field:  fe.Field(),
                Reason: errorMsg,
            })
        }
        return "Validasi Input Gagal", errorDetails
    }

    return "Format JSON tidak valid", []response.ErrorDetail{
        {Field: "body", Reason: err.Error()},
    }
}