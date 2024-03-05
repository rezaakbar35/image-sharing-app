package model

import (
	"gorm.io/gorm"
)

type Photo struct {
	gorm.Model
	Title    string `json:"title" gorm:"not null"`
	Caption  string `json:"caption" gorm:"not null"`
	PhotoUrl string `json:"photoUrl" gorm:"not null"`
	UserID   uint   `gorm:"foreignKey:UserID;references:ID"`
}
