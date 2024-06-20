import { axiosInstance, publicAxios } from "./api_config";

export async function apiRegister(
  fullName: string,
  email: string,
  password: string,
  phoneNumber: string,
  gender: number
) {
  const url = "User";
  const dataSend = {
    fullName,
    email,
    password,
    phoneNumber,
    gender
  };
  console.log(dataSend);
  return publicAxios.post(url, dataSend);
}
