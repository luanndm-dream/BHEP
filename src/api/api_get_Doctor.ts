import { publicAxios } from "./api_config";

export async function apiGetDoctors(pageSize? : number) {
  const url = `User/Doctors`;
  const params = {
    PageSize : pageSize,
  };
  return publicAxios.get(url, { params });
}
