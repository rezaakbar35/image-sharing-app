import { instance } from "../axios";

async function getAllPhotos() {
    try {
    const response = await instance.get("/photos");
    return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getSpecificPhoto(id) {
    try {
        const response = await instance.get(`/photos/${id}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createPhoto(data) {
    try {
        const response = await instance.post("/photos", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updatePhoto(id, data) {
    try {
        const response = await instance.put(`/photos/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deletePhoto(id) {
    try {
        const response = await instance.delete(`/photos/${id}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAllPhotos, getSpecificPhoto, createPhoto, updatePhoto, deletePhoto }