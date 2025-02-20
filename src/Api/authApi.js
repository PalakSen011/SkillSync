import apiInstance from "./apiInstance";

export const loginUser = (data) => {
  const payload = { ...data, "org_username": "Amazatic" };
  return apiInstance.post("login/", payload);
};

export const signUpUser = (data) => apiInstance.post("signup/", data);

export const forgotPassword = (email) =>
  apiInstance.post("forgot-password/", { email });
export const resetPassword = (payload, token) =>
  apiInstance.post("reset-password/", payload, {
    headers: { Authorization: `Token ${token}` },
  });
