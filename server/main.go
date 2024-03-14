package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rezaakbar35/image-sharing-app/server/controller/photoController"
	"github.com/rezaakbar35/image-sharing-app/server/controller/userController"
	"github.com/rezaakbar35/image-sharing-app/server/helper"
	"github.com/rezaakbar35/image-sharing-app/server/model"
)

func init() {
	helper.LoadEnv()
	model.ConnectDB()
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowCredentials: true,
		AllowHeaders:     []string{"Authorization", "Content-Type"},
	}))

	r.GET("/api/users", userController.GetAllUser)
	r.GET("/api/users/:id", userController.GetUserById)
	r.POST("/api/users/register", userController.Register)
	r.POST("/api/users/login", userController.Login)
	r.PUT("/api/users/:id", userController.UpdateUser)
	r.DELETE("/api/users/:id", userController.DeleteUser)

	r.GET("/api/photos", photoController.GetAllPhoto)
	r.GET("/api/photos/:id", helper.Auth, photoController.GetPhotoById)
	r.POST("/api/photos", helper.Auth, photoController.CreatePhoto)
	r.PUT("/api/photos/:id", helper.Auth, photoController.UpdatePhoto)
	r.DELETE("/api/photos/:id", helper.Auth, photoController.DeletePhoto)

	// Make the uploads directory accessible to clients
	r.StaticFS("/uploads", http.Dir("./uploads"))
	r.Run()
}
