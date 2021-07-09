import axios from "axios";
import AuthenticationHeader, { refreshToken } from "./authHeader";

class ProductService {
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

  getAllProduct(url) {
    return this.instance.get(url, { headers: AuthenticationHeader() });
  }

  getProductById(url) {
    return this.instance.get(url, { headers: AuthenticationHeader() });
  }

  postUpdateProductById(url, body) {
    return this.instance.post(url, body, { headers: AuthenticationHeader() })
  }

  postCreateProdudct(url, body) {
    return this.instance.post(url, body, { headers: AuthenticationHeader() });
  }

  getDeleteProduct(url) {
    return this.instance.get(url, { headers: AuthenticationHeader() });
  }
}

export default new ProductService();