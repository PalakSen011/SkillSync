// Validation.js
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !emailRegex.test(email) ? "Please enter a valid email." : "";
};

export const validatePassword = (password) => {
  if (password === "") return "Password cannot be empty.";
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@]).{8,}$/;
  return !passwordRegex.test(password)
    ? "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character (@)."
    : "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password !== confirmPassword ? "Passwords do not match." : "";
};

export const validatePhoneNumber = (value) => {
  return (
    /^[789]\d{9}$/.test(value) ||
    "Phone number must start with 7, 8, or 9 and be 10 digits long."
  );
};
