import { publicAxios } from "./api_config";

export async function apiPutPayment(paymentId: number,userId: number, status: number) {
  const url = `Payment/${paymentId}`;
  const dataSend = {
    paymentId,
    status
  };
  return publicAxios.put(url, dataSend, {headers: {"Content-Type": "application/json"}});
}
