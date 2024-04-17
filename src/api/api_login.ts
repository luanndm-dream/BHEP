import { publicAxios } from "./api_config"

export async function apiLogin(email: string, password: string ){
    const url = 'Auth/Login'
    const dataSend :Object = {
        email: email,
        password: password
    }
    return publicAxios.post(url,dataSend)
}