import { getMe, google0Auth, userLogin, userLogout, userRegistratiod } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";


export function useLogin() {
    return useMutation({
        mutationFn: userLogin
    })
}


export function useRegistration() {
    return useMutation({
        mutationFn: userRegistratiod
    })
}


export function useLogout() {
    return useMutation({
        mutationFn: userLogout
    })
}


export function useGetMe() {
    return useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false
    })
}


export function useGoogleOAuth() {
    return useMutation({
        mutationFn: google0Auth,
    })
}