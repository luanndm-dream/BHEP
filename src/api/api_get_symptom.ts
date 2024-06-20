import { publicAxios } from "./api_config";

export async function apiGetSymptom() {
  const url = `Symptom`;
  return publicAxios.get(url);
}
