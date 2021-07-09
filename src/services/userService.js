import axios from "axios";
import AuthenticationHeader, { refreshToken } from "./authHeader";

class UserService {
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

  getAllUser(url) {
    return this.instance.get(url, { headers: AuthenticationHeader() });
  }

  getUserById(url) {
    return this.instance.get(url, { headers: AuthenticationHeader() });
  }

  postUpdateUserById(url, body) {
    return this.instance.post(url, body, { headers: AuthenticationHeader() })
  }

  postCreateUser(url, body) {
    return this.instance.post(url, body, { headers: AuthenticationHeader() });
  }

  getDeleteUser(url) {
    return this.instance.get(url, { headers: AuthenticationHeader() });
  }

  postChangePassword(url, body) {
    return this.instance.post(url, body, { headers: AuthenticationHeader() });
  }

  getRankUserPoint(url) {
    return this.instance.get(url, { headers: AuthenticationHeader() });
  }

  getAllHistoryPointByUserId(url) {
    return this.instance.get(url, { headers: AuthenticationHeader() });
  }

  postChangeGift(url, body) {
    return this.instance.post(url, body, { headers: AuthenticationHeader() });
  }
}

export default new UserService();