import { publicAxios } from "./api_config";

export async function apiGetHealthRecord(userId : number) {
  const url = `https://cleanly-divine-pegasus.ngrok-free.app/Api/V1/HealthRecord?UserId=${userId}`;
  

  return publicAxios.get(url);
  
}
