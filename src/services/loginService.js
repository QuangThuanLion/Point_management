import axios from "axios";

class LoginService {
    constructor(){
        const instance = axios.create();
        instance.interceptors.response.use(this.handleSuccess(), this.handleError());
        this.instance = instance;
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return (error);
    }

    post(url, body) {
        return this.instance.post(url, body);
    }

    postRefreshToken(url, body) {
        return this.instance.post(url, body);
    }
}

export default new LoginService();