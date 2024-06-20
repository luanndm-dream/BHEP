import { axiosInstance, publicAxios } from "./api_config";

export async function apiPostAppointment(
  customerId: number,
  employeeId: number,
  date: string,
  time: string,
  price: number,
  address?: string,
  latitude?: string,
  longitude?: string,
  description?: string,
  note?: string,
  symptoms?: any[]
) {
  const url = `Appointment`;
  const dataSend = {
    customerId,
    employeeId,
    date,
    time,
    price,
    address,
    latitude,
    longitude,
    description,
    note,
    symptoms,
  };
  return publicAxios.post(url, dataSend, {
    headers: { "Content-Type": "application/json" },
  });
}
