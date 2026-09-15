import { applyDoctor } from "@/api/doctor.api";
import { useMutation } from "@tanstack/react-query";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyDoctor,
  });
}