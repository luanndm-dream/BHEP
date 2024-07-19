import { publicAxios } from "./api_config";

interface HealthParams {
  temp: number;
  heartBeat: number;
  eSpO2: number;
}

export async function apiPostHealthRecord(userId: number, deviceId: string, healthParams: HealthParams[]) {
  const url = `HealthRecord`;
  const dataSend = {
    userId: userId,
    deviceId: deviceId,
    healthParams: healthParams
  };
  return publicAxios.post(url, dataSend, { headers: { "Content-Type": "application/json" } });
}
