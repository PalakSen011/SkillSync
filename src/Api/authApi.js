import apiInstance from "./apiInstance";
import API_URLS from "../Constants/ApiUrls"; // Importing the API URLs

export const loginUser = (data) => {
  const payload = { ...data, org_username: "Amazatic" };
  return apiInstance.post(API_URLS.LOGIN, payload);
};

export const signUpUser = (data) => apiInstance.post(API_URLS.SIGNUP, data);

export const forgotPassword = (email) =>
  apiInstance.post(API_URLS.FORGOT_PASSWORD, { email });

export const resetPassword = (payload, token) =>
  apiInstance.post(API_URLS.RESET_PASSWORD, payload, {
    headers: { Authorization: `Token ${token}` },
  });
