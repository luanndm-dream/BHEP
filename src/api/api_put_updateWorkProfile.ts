import { axiosInstance, publicAxios } from "./api_config";

export async function apiUpdateWorkProfile(workProfileId: number,majorId: number, userId: number, workPlace: string, certificate: string, experienceYear: number, price: number) {
  const url = `WorkProfile/${workProfileId}`
  const dataSend  = {
    id: userId,
    majorId,
    workPlace,
    certificate,
    experienceYear,
    price
  }
  return publicAxios.put(url, dataSend, {headers: {"Content-Type": 'application/json'}});
}
