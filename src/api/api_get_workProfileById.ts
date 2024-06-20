import { axiosInstance, publicAxios } from "./api_config";

export async function apiGetWorkProfileById(userId: number) {
  const url = `WorkProfile/${userId}`;
  return publicAxios.get(url);
}
