import { publicAxios } from "./api_config";

export async function apiPostSchedule(employeeId: number, schedules: [any]) {
  const url = `Schedule`;
  const dataSend = {
    employeeId: employeeId,
    schedules: schedules,
  };
  return publicAxios.post(url, dataSend);
}
