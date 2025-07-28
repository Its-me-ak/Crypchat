import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  console.log(response.data);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  console.log(response.data);
  return response.data;
};

export const getAuthUser = async () => {
 try {
   const response = await axiosInstance.get("/auth/me");
   return response.data;
 } catch (error) {
    console.error("Error fetching authenticated user:", error);
    return null;
 }
};

export const completeOnboarding = async (onboardingData) => {
  const response = await axiosInstance.post("/auth/onboarding", onboardingData);
  console.log(response.data);
  return response.data;
};