import { publicAxios } from "./api_config";

export async function apiGetCoinTransactionById(transactionId: number) {
  const url = `CoinTransaction/${transactionId}`;

  return publicAxios.get(url);
}
