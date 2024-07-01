import { publicAxios } from "./api_config";

export async function apiGetCoinTransactionByUserId(UserId: number, PageIndex?: number, PageSize?:number) {
  const url = `CoinTransaction/UserId`;
  const params = {
    UserId,
    PageIndex,
    PageSize
  };
  return publicAxios.get(url, { params });
}
