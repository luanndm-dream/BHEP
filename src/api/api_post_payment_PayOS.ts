import { publicAxios } from "./api_config";

export async function apiPostPaymentPayOS(
  userId: number,
  amount: number,
  description: string,
  items: any[],
  returnUrl: string,
  cancelUrl: string,
  expiredAt: number
) {
  const url = `Payment/PayOS`;
  const dataSend = {
    userId,
    amount,
    description,
    items: items,
    returnUrl,
    cancelUrl,
    expiredAt,
  };

  return publicAxios.post(url, dataSend, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
