import { axiosInstance, publicAxios } from "./api_config";

export async function apiGetScheduleById(employeeId: number) {
  const url = `Schedule/employee/${employeeId}`;
  return publicAxios.get(url);
}
