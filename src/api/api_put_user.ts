import { axiosInstance, publicAxios } from "./api_config";

export async function apiUpdateUser(
  userId: number,
  fullName: string,
  email: string,
  phoneNumber: string,
  gender: number,
  avatar?: any
) {
  const url = `User/${userId}`;
  
  const formData = new FormData();
  formData.append('Id', userId.toString());
  formData.append('FullName', fullName);
  formData.append('Email', email);
  formData.append('PhoneNumber', phoneNumber);
  formData.append('Gender', gender.toString());

  if (avatar) {
    formData.append('Avatar', avatar);
  }

  return publicAxios.put(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
