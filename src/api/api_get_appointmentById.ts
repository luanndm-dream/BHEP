import { publicAxios } from "./api_config";

export async function apiGetAppointmentById(appointmentId: number) {
  const url = `Appointment/${appointmentId}`;
  return publicAxios.get(url);
}
