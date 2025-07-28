import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { login } from "../utils/api";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate queries or perform any side effects after successful login
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return {
    loginMutation: mutate,
    isPending,
    error,
  };
};
export default useLogin;
