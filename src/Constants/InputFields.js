import { MESSAGE_CONSTANTS } from "./MessageConstants";
import { genderOptions, roleOptions } from "./Options";
import {
  validatePhoneNumber,
  validatePassword,
  validateEmail,
} from "../utils/validation";
const handleEmailChange = (e) => {
  const value = e.target.value;
  const error = validateEmail(value);
  if (error) {
    setError("email", { type: "manual", message: error });
  } else {
    clearErrors("email");
  }
};

export const signUpFormFields = [
  {
    type: "text",
    name: "first_name",
    placeholder: "First Name",
    validation: { required: MESSAGE_CONSTANTS.ERROR_FIRST_NAME_REQUIRED },
  },
  {
    type: "text",
    name: "last_name",
    placeholder: "Last Name",
    validation: { required: MESSAGE_CONSTANTS.ERROR_LAST_NAME_REQUIRED },
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email",
    validation: { required: MESSAGE_CONSTANTS.ERROR_INVALID_EMAIL },
  },
  {
    type: "text",
    name: "phone_number",
    placeholder: "Phone Number",
    validation: {
      required: MESSAGE_CONSTANTS.ERROR_PHONE_REQUIRED,
      validate: validatePhoneNumber,
    },
  },
  {
    type: "dropdown",
    name: "gender",
    options: genderOptions,
    validation: { required: MESSAGE_CONSTANTS.ERROR_GENDER_REQUIRED },

    className: "w-auto",
  },
  {
    type: "dropdown",
    name: "role",
    options: roleOptions,
    validation: { required: MESSAGE_CONSTANTS.ERROR_ROLE_REQUIRED },

    className: " w-1/3",
  },
  {
    type: "password",
    name: "password",
    validation: { required: MESSAGE_CONSTANTS.ERROR_PASSWORD_REQUIRED },
  },
];
export const signInFormFields = [
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    validation: {
      required: MESSAGE_CONSTANTS.emailRequired,
      validate: (value) => validateEmail(value) || true,
    },
    onChange: handleEmailChange,
  },
  {
    type: "password",
    name: "password",
    validation: {
      required: MESSAGE_CONSTANTS.passwordRequired,
      validate: (value) => validatePassword(value) || true,
    },
  },
];
