import { publicAxios } from "./api_config";

export async function apiPutAppointmentWithStatus(appointmentId: number, customerId: number, employeeId: number, status: number) {
  const url = `Appointment/${appointmentId}/Status`;
  const dataSend = {
    id: appointmentId,
    customerId,
    employeeId,
    status
  };
  return publicAxios.put(url, dataSend, {headers: {"Content-Type": "application/json"}});
}
