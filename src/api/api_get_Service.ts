import { publicAxios } from "./api_config";

export async function apiGetService() {
  const url = `Service`;
  return publicAxios.get(url);
}
