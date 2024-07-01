import { publicAxios } from "./api_config";

export async function apiPostApplicationJob(
  customerId: number | undefined,
  fullName: string,
  certification: string,
  major: number,
  avatar: string,
  workplace: string,
  experienceYear: number
) {
  const url = "JobApplication";

  const formData = new FormData();

  formData.append("CustomerId", customerId);
  formData.append("MajorId", major);
  formData.append("FullName", fullName);
  formData.append("Certification", certification);
  formData.append("Avatar", avatar);
  formData.append("WorkPlace", workplace);
  formData.append("ExperienceYear", experienceYear);
  // const dataSend: Object = {
  //  customerId,
  //  fullName,
  //  certification,
  //  major,
  //  avatar,
  //  workplace,
  //  experienceYear
  // };
  return publicAxios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
