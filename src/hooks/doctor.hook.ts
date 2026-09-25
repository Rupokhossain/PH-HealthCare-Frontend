import { applyDoctor, getAllDoctors, verifyDoctorAccount } from "@/api/doctor.api";
import { DoctorParams } from "@/types";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyDoctor,
  });
}


export function useVerifyDoctorAccount() {
  return useMutation({
    mutationFn: verifyDoctorAccount
  })
}


export function useGetAllDoctors(params: DoctorParams) {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: () => getAllDoctors(params)
  })
}


export function useSuspenseGetAllDoctors(params: DoctorParams) {
  return useSuspenseQuery({
    queryKey: ["doctors"],
    queryFn: () => getAllDoctors(params)
  })
}