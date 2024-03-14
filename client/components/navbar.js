'use client'

import React from "react"
import { useState, useEffect } from "react"
import { IoSearchOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import LoginModal from "@/components/loginmodal";
import Cookies from "js-cookie";

function Navbar() {
const [isLogin, setIsLogin] = useState(false)
const [modalOpen, setModalOpen] = useState(false)

useEffect(() => {
    const token = Cookies.get("Authorization")
    if (token) {
        setIsLogin(true)
    } else {
        setIsLogin(false)
    }
}, [])

const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLogin(false)
}

return (
    <div>
        <LoginModal visible={modalOpen} onClose={() => setModalOpen(false)} />
        <div className="fixed z-40 w-screen bg-white">
        <nav className="flex items-center justify-between p-2 rounded-full mx-8 my-6 top-0 bg-primary text-white">
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full bg-white">
                </div>
            </div>
            <div className="flex items-center w-[85%] max-sm:w-[68%] md:w-[65%] lg:w-[85%] h-10 max-sm:h-8 rounded-full bg-secondary">
                <div className="flex items-start">
                    <div className="ml-2 max-sm:my-auto mt-2">
                        <IoSearchOutline size={25} color="#7469B6"/>
                    </div>
                    <div className="ml-2 max-sm:my-auto">
                        <input type="text" className="h-10 max-sm:h-8 focus:outline-0 focus:ring-0 max-sm:text-white max-sm:w-28 text-white bg-secondary md:w-[370px] lg:w-[1260px]" placeholder="Search..."/>
                    </div>
                    <div className="ml-3 flex">
                        <div className="w-[2px] h-8 mt-1 max-sm:hidden bg-primary">
                        </div>
                        <div className="ml-2 mt-2 max-sm:hidden">
                        <IoIosMore size={25} color="#7469B6"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                {
                isLogin? (
                    <a href="/signup" className="text-lg font-semibold">
                    Log Out
                </a>
                ) : (
                    <div className="w-32 h-10 max-sm:h-8 max-sm:w-8 max-sm:mt-0 bg-secondary rounded-full mr-4 max-sm:mr-1 hover:bg-[#8d89cb] hover:cursor-pointer hover:scale-105" onClick={() => setModalOpen(true)}>
                        <div className="flex items-center justify-center mt-1 text-lg max-sm:text-sm max-sm:hidden" >
                            Login
                        </div>
                    </div>
                )}
            </div>
        </nav>
        </div>
    </div>
    )
}

export default Navbar