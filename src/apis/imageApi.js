import ImageService from "../services/imageService";
import { API_ENDPOINT } from "../utils/constantApi";

const API_URL_UPLOAD_IMAGE = "upload"

export const getShowImage = (image) => {
    return ImageService.getShowImage(`${API_ENDPOINT}/${image}`)
}

export const postUploadImage = (data) => {
    return ImageService.postUploadImage(`${API_ENDPOINT}/${API_URL_UPLOAD_IMAGE}`, data)
}