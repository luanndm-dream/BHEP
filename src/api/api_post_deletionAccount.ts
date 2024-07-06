import { publicAxios } from "./api_config";

export async function apiPostDeletionAccount(userId: number, reason?: string) {
  const url = `DeletionRequest`;
  const dataSend = {
    userId,
    reason
  };
  return publicAxios.post(url, dataSend, {headers: {"Content-Type": "application/json"}});
}
