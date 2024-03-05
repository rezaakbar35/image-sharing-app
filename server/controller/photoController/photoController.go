package photoController

import (
	"fmt"
	"net/http"

	"time"

	"github.com/gin-gonic/gin"
	"github.com/rezaakbar35/image-sharing-app/server/model"
	"gorm.io/gorm"
)

func GetAllPhoto(c *gin.Context) {
	var photos []model.Photo

	if err := model.DB.Find(&photos).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"photo": photos})
}

func GetPhotoById(c *gin.Context) {
	var photo model.Photo
	id := c.Param("id")

	if err := model.DB.First(&photo, id).Error; err != nil {
		switch err {
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Photo not found!"})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"photo": photo})
}

func CreatePhoto(c *gin.Context) {
	var photo model.Photo
	user_id, _ := c.Get("user_id")

	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, ok := user_id.(uint)
	if !ok {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	files := c.Request.MultipartForm.File["Photo"]
	if len(files) == 0 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}

	file := files[0]

	filePath := "uploads/" + time.Now().Format("20060102150405") + file.Filename
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	photo.UserID = userID
	photo.Title = c.Request.MultipartForm.Value["Title"][0]
	photo.Caption = c.Request.MultipartForm.Value["Caption"][0]
	photo.PhotoUrl = filePath // Use the file path as the URL

	if err := model.DB.Create(&photo).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Create Success!", "photo": photo})
}

func UpdatePhoto(c *gin.Context) {
	var photo model.Photo
	id := c.Param("id")
	user_id, _ := c.Get("user_id")

	if err := model.DB.First(&photo, id).Error; err != nil {
		switch err {
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Photo not found!"})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	userID, ok := user_id.(uint)
	if !ok {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	if userID != photo.UserID {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	files := c.Request.MultipartForm.File["Photo"]
	if len(files) == 0 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}

	file := files[0]

	filePath := "uploads/" + time.Now().Format("20060102150405") + file.Filename
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	photo.UserID = userID
	photo.Title = c.Request.MultipartForm.Value["Title"][0]
	photo.Caption = c.Request.MultipartForm.Value["Caption"][0]
	photo.PhotoUrl = filePath // Use the file path as the URL

	if err := model.DB.Save(&photo).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Update Success!", "photo": photo})
}

func DeletePhoto(c *gin.Context) {
	var photo model.Photo
	id := c.Param("id")
	user_id, _ := c.Get("user_id")

	if err := model.DB.First(&photo, id).Error; err != nil {
		switch err {
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Photo not found!"})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	userID, ok := user_id.(uint)
	if !ok {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	if userID != photo.UserID {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if err := model.DB.Delete(&photo, id).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete Success!", "photo": photo})
}
