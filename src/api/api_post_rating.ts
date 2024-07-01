import { publicAxios } from "./api_config";

export async function apiPostUserRate(customerId: number,employeeId: number, appointmentId: number, reason: string ,rate: number) {
  const url = `UserRate`;
  const dataSend = {
    customerId,
    employeeId,
    appointmentId,
    reason,
    rate
  };
  return publicAxios.post(url, dataSend, {headers: {"Content-Type": "application/json"}});
}
