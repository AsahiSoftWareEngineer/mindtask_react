import { DEFAULT_HOST } from "../env/endpoint"
import { post } from "./api"

export class AuthenticationService {
    loginRequest = async (email: string, password: string) => {
        if(email.length > 0 && password.length > 0) {
            const request = await fetch(`${DEFAULT_HOST}/auth/login/`, {
               method: "POST",
               headers: {
                "Content-Type": "application/json",
               },
               body: JSON.stringify({
                email: email,
                password: password
               })
            })
            const response = await request.json();
            if(!response.non_field_errors){
                const setToken = await this.setAccessToken(response.access_token, response.refresh_token)
                return setToken;
            }else {
                return 403; 
            }
        } else {
            return 400;
        }
    }

    signupRequest = async (
        email: string, 
        username: string, 
        password1: string, 
        password2: string) => {
            if(email.length > 0 && username.length > 0 && password1.length > 0 && password2.length > 0) {
                const request = await fetch(`${DEFAULT_HOST}/auth/register/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        username: username,
                        password1: password1,
                        password2: password2
                    })
                })
                const response = await request.json();
                if(response.email){
                    if(response.email[0].includes("already")){
                        return {response: 403, "message": "そのメールアドレスはすでに使用されています"}
                    } else if(response.email[0].includes("valid")){
                        return {response: 403, "message": "正しいメールアドレスを入力してください"}
                    }
                }
                else if (response.username)return {resonse: 403, "message": "そのユーザーネームはすでに使用されています"}
                else if (response.password1){
                    if(response.password1[0].includes("short"))return {response: 403, "message": "パスワードが短すぎます。最低8文字以上で登録してください。"}
                }
                else if(response.non_field_errors) return {response: 403, "message": "パスワードがユーザネームもしくはメールアドレスと似ているので登録できません。"}
                else {
                    const setToken = await this.setAccessToken(response.access_token, response.refresh_token);
                    return {response: setToken.response}
                }
            }else {
                return {response:400}
            }
    }

    setAccessToken = async (accessToken:string, refreshToken:string) => {
        const request = await post(`${DEFAULT_HOST}/api/v1/token/set/`, {
            accessToken: accessToken,
            refreshToken: refreshToken
        });
        return request
    }

    getRefreshToken = async () => {
        const request = await post(`${DEFAULT_HOST}/api/v1/refresh_token/get/`);
        console.log(request);
        return request.token;
    }

    getNewToken = async (refreshToken:string) => {
        const request = await post(`${DEFAULT_HOST}/auth/token/refresh/`, {
            refresh:refreshToken,
        });
        return request;
    } 

    renewToken = async () => {
        const refreshToken = await this.getRefreshToken();
        const newToken = await this.getNewToken(refreshToken);
        if(newToken.code == "token_not_valid"){window.location.href = "/auth/login"}
        const setToken = await this.setAccessToken(newToken.access, newToken.refresh);
        return setToken;
    }

    hasRefreshToken = async () => {
        const request = await post(`${DEFAULT_HOST}/api/v1/has_refresh_token/`);
        return request.response
    }

    isExpiredToken = async () => {
        const request = await post(`${DEFAULT_HOST}/api/v1/is_expired_token/`);
        return request.response
    }
}