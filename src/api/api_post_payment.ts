import { publicAxios } from "./api_config";

export async function apiPostPayment(userId: number, amount: number) {
  const url = `Payment`;
  const dataSend = {
    userId,
    amount
  };
  return publicAxios.post(url, dataSend, {headers: {"Content-Type": "application/json"}});
}
