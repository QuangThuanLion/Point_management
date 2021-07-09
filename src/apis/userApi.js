import UserService from "../services/userService";
import { API_ENDPOINT } from "../utils/constantApi";

const API_URL_GET_ALL_USER = "user/find/all";
const API_URL_FIND_USER_BY_ID = "user/find";
const API_URL_UPDATE_USER_BY_ID = "user/update"
const API_URL_CREATE_USER = "user/create"
const API_URL_DELETE_USER_BY_ID = "user/delete"
const API_URL_CHANGE_PASSWORD = "changePass";
const API_URL_GET_ALL_HISTORY_POINT_BY_USERID = "history/getAll";
const API_URL_CHANGE_GIFT = "user/changeGift";
const API_URL_GET_RANK_POINT = "user/boardRank";

export const getAllUser = (limit) => {
    return UserService.getAllUser(`${API_ENDPOINT}/${API_URL_GET_ALL_USER}/${limit}`);
}

export const getUserById = (id) => {
    return UserService.getUserById(`${API_ENDPOINT}/${API_URL_FIND_USER_BY_ID}/${id}`);
}

export const postUpdateUser = (data) => {
    return UserService.postUpdateUserById(`${API_ENDPOINT}/${API_URL_UPDATE_USER_BY_ID}`, data);
}

export const postCreateUser = (data) => {
    return UserService.postCreateUser(`${API_ENDPOINT}/${API_URL_CREATE_USER}`, data);
}

export const getDeleteUserById = (id) => {
    return UserService.getDeleteUser(`${API_ENDPOINT}/${API_URL_DELETE_USER_BY_ID}/${id}`);
}

export const postChangePassword = (data) => {
    return UserService.postChangePassword(`${API_ENDPOINT}/${API_URL_CHANGE_PASSWORD}`,data);
}

export const getAllPointHistory = (id) => {
    return UserService.getAllHistoryPointByUserId(`${API_ENDPOINT}/${API_URL_GET_ALL_HISTORY_POINT_BY_USERID}/${id}`);
}

export const postChangeGift = (data) => {
    return UserService.postChangeGift(`${API_ENDPOINT}/${API_URL_CHANGE_GIFT}`, data);
}

export const getRankUserPoint = (limit) => {
    return UserService.getRankUserPoint(`${API_ENDPOINT}/${API_URL_GET_RANK_POINT}/${limit}`);
}