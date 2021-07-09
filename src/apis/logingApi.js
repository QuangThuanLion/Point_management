import LoginService from "../services/loginService";
import { API_ENDPOINT } from "../utils/constantApi";

const API_URL = "login";
const API_URL_REFRESH_TOKEN = "user/refereshToken";

export const loging = (data) => {
    return LoginService.post(`${API_ENDPOINT}/${API_URL}`, data);
}

export const postRefreshToken = (data) => {
    return LoginService.postRefreshToken(`${API_ENDPOINT}/${API_URL_REFRESH_TOKEN}`, data);
}