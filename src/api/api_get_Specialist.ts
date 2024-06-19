import { publicAxios } from "./api_config";

export async function apiGetSpecialist() {
  const url = `Specialist`;
  return publicAxios.get(url);
}
