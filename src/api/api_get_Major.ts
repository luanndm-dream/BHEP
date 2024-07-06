import { publicAxios } from "./api_config";

export async function apiGetMajor() {
  const url = `Major`;
 
  return publicAxios.get(url);
  
}
