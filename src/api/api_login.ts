import { axiosInstance, publicAxios } from "./api_config"

export async function apiLogin(email: string, password: string ){
    const url = 'Auth/Login'
    const dataSend :{email: string, password: string}= {
        email: email,
        password: password
    }
    console.log(dataSend)
    return publicAxios.post(url,dataSend)
}