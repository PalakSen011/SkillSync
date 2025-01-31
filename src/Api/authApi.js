import apiInstance from "./apiInstance";

export const loginUser = (data) => apiInstance.post("login/", data);
export const signUpUser = (data) => apiInstance.post("signup/", data);
export const forgotPassword = (email) =>
  apiInstance.post("forgot-password/", { email });
export const resetPassword = (payload, token) =>
  apiInstance.post("reset-password/", payload, {
    headers: { Authorization: `Token ${token}` },
  });
