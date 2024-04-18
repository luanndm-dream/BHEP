import { publicAxios } from "./api_config";

export async function apiPostApplicationJob(
  customerId: number,
  fullName: string,
  certification: string,
  major: number,
  avatar: string,
  workplace: string,
  experienceYear: number
) {
  const url = "JobApplication";
  const dataSend: Object = {
   customerId,
   fullName,
   certification,
   major,
   avatar,
   workplace,
   experienceYear
  };
  return publicAxios.post(url, dataSend);
}
