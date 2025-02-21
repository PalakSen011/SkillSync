import { MESSAGE_CONSTANTS } from "./MessageConstants";
import { genderOptions, roleOptions } from "./Options";
<<<<<<< HEAD
import { validatePhoneNumber, validatePassword,validateEmail} from "../utils/validation";
const handleEmailChange = (e) => {
  const value = e.target.value;
  const error = validateEmail(value);
  if (error) {
    setError("email", { type: "manual", message: error });
  } else {
    clearErrors("email");
  }
};
=======
import { validatePhoneNumber } from "../Utils/validation";

>>>>>>> 053b7dea817024186a614e80046c90a4f61b7f22
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
<<<<<<< HEAD
    className: "w-auto",
=======
    className: "w-1/2",
>>>>>>> 053b7dea817024186a614e80046c90a4f61b7f22
  },
  {
    type: "dropdown",
    name: "role",
    options: roleOptions,
    validation: { required: MESSAGE_CONSTANTS.ERROR_ROLE_REQUIRED },
<<<<<<< HEAD
    className: " w-1/3",
=======
    className: "w-1/4",
>>>>>>> 053b7dea817024186a614e80046c90a4f61b7f22
  },
  {
    type: "password",
    name: "password",
    validation: { required: MESSAGE_CONSTANTS.ERROR_PASSWORD_REQUIRED },
  },
];
<<<<<<< HEAD

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
    type:"password",
    name: "password",
    validation: {
      required: MESSAGE_CONSTANTS.passwordRequired,
      validate: (value) => validatePassword(value) || true,
    },
  },
];
=======
>>>>>>> 053b7dea817024186a614e80046c90a4f61b7f22
