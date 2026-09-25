import apiClient from "@/lib/apiClient";
import { ApiResponse, VerifyAccountPaylaod } from "@/types";
import { Doctor, DoctorApplicationPayload, DoctorParams } from "@/types/doctor.type";

export function applyDoctor(payload: DoctorApplicationPayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctor/apply-as-doctor", {
    method: "POST",
    body: formData,
  });
}


export function verifyDoctorAccount(payload: VerifyAccountPaylaod) {
  return apiClient("/doctor/apply-as-doctor/verify-email", {
    method: "POST",
    body: payload,
  })
}



export function getAllDoctors(params: DoctorParams) {
  return apiClient<ApiResponse<Doctor[]>>("/doctor/all-doctors", {
    params
  });
}