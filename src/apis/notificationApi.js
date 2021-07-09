import NotificationService from "../services/notificationService";
import { API_ENDPOINT } from "../utils/constantApi";

const API_POST_NOTIFICATION = "notifications";

export const postNotification = (data) => {
    return NotificationService.post(`${API_ENDPOINT}/${API_POST_NOTIFICATION}`, data);
}