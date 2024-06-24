import { publicAxios } from "./api_config";

export async function apiGetProduct() {
  const url = `Product`;

  return publicAxios.get(url);
}
