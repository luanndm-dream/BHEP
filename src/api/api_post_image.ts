import { axiosInstance, publicAxios } from "./api_config"

export async function apiPostImage(name:string,form: any){
    const url = `Image/?Name=${name}`
    const dataSend= {
        file: form
    }
    return axiosInstance.post(url,form, {headers: {"Content-Type": "multipart/form-data"}})
}