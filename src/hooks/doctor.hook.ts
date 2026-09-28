import { applyDoctor, approveDoctor, getAllDoctors, getAllPublicDoctors, getTodayScheduleByDoctor, verifyDoctorAccount } from "@/api/doctor.api";
import { DoctorParams, PublicDoctorParams } from "@/types";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

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

export function useApproveDoctor() {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["doctors"]});
    }
  }); 
}


export function useGetTodayScheduleByDoctor(params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["schedule", params],
    queryFn: () => getTodayScheduleByDoctor(params),
  });
}

export function useSuspenseGetPublicDoctors(params: PublicDoctorParams) {
  return useSuspenseQuery({
    queryKey: ["doctors", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}