import axios from "axios";
import AuthenticationHeader, { refreshToken } from "./authHeader";

class ImageService {
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

  getShowImage(url) {
    return this.instance.get(url, { headers: AuthenticationHeader() });
  }

  postUploadImage(url, body) {
    return this.instance.post(url, body, { headers: AuthenticationHeader() })
  }
  s
}

export default new ImageService();