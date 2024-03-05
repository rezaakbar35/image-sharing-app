import { instance } from "../axios";

async function getAllUsers() {
    try {
        const response = await instance.get("/users");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function Login(data) {
    try {
        const response = await instance.post("/users/login", data);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function Register(data) {
    try {
        const response = await instance.post("/users/register", data);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}


export { getAllUsers, Login, Register }