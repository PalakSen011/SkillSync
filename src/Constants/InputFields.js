import { MESSAGE_CONSTANTS } from "./MessageConstants";
import { genderOptions, roleOptions } from "./Options";
import { categoryOptions, mandatoryOptions, statusOptions } from "./Options";
import {
  validatePhoneNumber,
  validatePassword,
  validateEmail,
} from "../Utils/validation";

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

export const courseListTableHeader = [
  "Name",
  "Mandatory",
  "Category",
  "No of assignees",
  "Course duration",
  "Status",
];
export const filterFields = [
  {
    type: "radio",
    name: "mandatory",
    options: mandatoryOptions,
    label: "Mandatory",
  },
  {
    type: "checkbox",
    name: "category",
    options: categoryOptions,
    label: "Category",
  },
  {
    type: "checkbox",
    name: "status",
    options: statusOptions,
    label: "Status",
  },
  {
    type: "range",
    name: "assigneeRange",
    label: "No of Assignees",
    min: 0,
    max: 100,
  },
  {
    type: "range",
    name: "courseDuration",
    label: "Course Duration (min)",
    min: 0,
    max: 100,
  },
];

export const coursesFields = [
  {
    id: "courseTitle",
    name: "title",
    type: "text",
    placeholder: "Enter Course Title",
    validation: { required: "Title is required" },
  },
  {
    id: "category",
    name: "category",
    type: "dropdown",
    options: categoryOptions,
    validation: { required: "Category is required" },
  },
  {
    id: "status",
    name: "status",
    type: "dropdown",
    options: statusOptions,
    validation: { required: "Status is required" },
  },
];
