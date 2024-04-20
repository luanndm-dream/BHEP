import { publicAxios } from "./api_config";

export async function apiGetUserById(
  userId: number,
 
) {
  const url = `User/${userId}`;
  return publicAxios.get(url);
}
