import { publicAxios } from "./api_config";

export async function apiPutChangePassword(userId: number,oldPassword: number, newPassword: number) {
  const url = `User/${userId}/ChangePassword`;
  const dataSend = {
    id: userId,
    oldPassword,
    newPassword
  };
  return publicAxios.put(url, dataSend, {headers: {"Content-Type": "application/json"}});
}
