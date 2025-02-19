import { MESSAGE_CONSTANTS } from "./MessageConstants";
import { genderOptions, roleOptions } from "./Options";
import { validatePhoneNumber } from "../utils/validation";

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
      className: "w-1/2",
    },
    {
      type: "dropdown",
      name: "role",
      options: roleOptions,
      validation: { required: MESSAGE_CONSTANTS.ERROR_ROLE_REQUIRED },
      className: "w-1/4",
    },
    {
      type: "password",
      name: "password",
      validation: { required: MESSAGE_CONSTANTS.ERROR_PASSWORD_REQUIRED },
    },
  ];