package main

import (
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

	r.GET("/api/users", userController.GetAllUser)
	r.GET("/api/users/:id", userController.GetUserById)
	r.POST("/api/users/register", userController.Register)
	r.POST("/api/users/login", userController.Login)
	r.PUT("/api/users/:id", userController.UpdateUser)
	r.DELETE("/api/users/:id", userController.DeleteUser)

	r.GET("/api/photos", helper.Auth, photoController.GetAllPhoto)
	r.GET("/api/photos/:id", helper.Auth, photoController.GetPhotoById)
	r.POST("/api/photos", helper.Auth, photoController.CreatePhoto)
	r.PUT("/api/photos/:id", helper.Auth, photoController.UpdatePhoto)
	r.DELETE("/api/photos/:id", helper.Auth, photoController.DeletePhoto)

	r.Run()
}