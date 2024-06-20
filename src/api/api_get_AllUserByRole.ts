import { publicAxios } from "./api_config";

export async function apiGetUserByRole(roleId: number, pageSize? : number) {
  const url = `User`;
  const params = {
    RoleId: roleId,
    PageSize : pageSize,
  };
  return publicAxios.get(url, { params });
}
