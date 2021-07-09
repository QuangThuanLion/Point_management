import { postRefreshToken } from "../apis/logingApi.js";
import { ACCESS_TOKEN } from "../utils/constantApi.js";

const AuthenticationHeader = () => {
  const user = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
  if (user && user.accessToken) {
    //return { Authorization: `Bearer ${user.accessToken}` };
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return null;
  }
};

export const refreshToken = (request) => {
  const user = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
  let { expiresIn, email} = user;
  let date = new Date().getTime();
  if (expiresIn - date < 86400) {
    async function refreshToken() {
      const requestApi = await postRefreshToken({email});
      try{
        const responseApi = requestApi.data;
        if(responseApi.success){
          const { data } = requestApi.data;
          let date = new Date();
          localStorage.setItem(
            ACCESS_TOKEN,
            JSON.stringify({
              id: data.id,
              email: data.email,
              accessToken: data.accessToken,
              expiresIn: date.getTime() + data.expiresIn
            })
          );
          request.headers.Authorization = AuthenticationHeader();
        } else {
          return false;
        }
      } catch(error) {
        console.log(error);
      }
    }
    refreshToken();
  }
  return request;
}

export default AuthenticationHeader;
