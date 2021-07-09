import axios from "axios";
import AuthenticationHeader, { refreshToken } from "./authHeader";

class NotificationService {
  constructor() {
    const instance = axios.create();

    instance.interceptors.request.use((request) => {
      const checkToken = refreshToken(request);
      if (!checkToken) {
        window.location.href = "/login";
      } else {
        return checkToken;
      }
    });
    instance.interceptors.response.use((response) => {
      return response;
    });

    this.instance = instance;
  }

  post(url, body) {
    return this.instance.post(url, body, { headers: AuthenticationHeader() });
  }
}

export default new NotificationService();