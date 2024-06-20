import { publicAxios } from "./api_config";

export async function apiPostPaymentVNPay(userId: number, amount: number) {
  const url = `Payment/VNPay`;
  const dataSend = {
    userId,
    amount
  };
  return publicAxios.post(url, dataSend, {headers: {"Content-Type": "application/json"}});
}
