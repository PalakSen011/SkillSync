import { MESSAGE_CONSTANTS } from "./MessageConstants";
import { genderOptions, roleOptions } from "./Options";
import { categoryOptions, mandatoryOptions, statusOptions } from "./Options";
import {
  validatePhoneNumber,
  validatePassword,
  validateEmail,
} from "../Utils/validation";

//Defines the fields required for user registration

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
  },
  {
    type: "dropdown",
    name: "role",
    options: roleOptions,
    validation: { required: MESSAGE_CONSTANTS.ERROR_ROLE_REQUIRED },
  },
  {
    type: "password",
    name: "password",
    validation: { required: MESSAGE_CONSTANTS.ERROR_PASSWORD_REQUIRED },
  },
];

// Defines the fields required for user login
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

// Defines the column headers for the course list table

export const courseListTableHeader = [
  "Name",
  "Mandatory",
  "Category",
  "No of assignees",
  "Course duration",
  "Status",
];

// Defines the filtering options for courses

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

// Defines the form fields for creating or editing a course

export const courseFields = [
  {
    type: "text",
    name: "title",
    id: "courseTitle",
    label: "Title",
    validation: { required: "Title is required" },
    className: "flex flex-col w-1/2",
  },
  {
    type: "dropdown",
    name: "category",
    id: "category",
    label: "Category",
    options: categoryOptions,
    validation: { required: "Category is required" },
  },
  {
    type: "dropdown",
    name: "status",
    id: "status",
    label: "Status",
    options: statusOptions,
    validation: { required: "Status is required" },
  },
];

//Lesson Fields Configuration
export const lessonFields = [
  {
    type: "text",
    name: "lesson_name",
    id: "lessonName",
    label: "Lesson Name",
    placeholder: "Enter lesson name",
    validation: { required: "Lesson name is required" },
    className: "flex flex-col",
  },
  {
    type: "text",
    name: "duration",
    id: "duration",
    label: "Duration (min)",
    placeholder: "e.g., 50",
    validation: { required: "Duration is required" },
    className: "flex flex-col w-1/6",
  },
  {
    type: "text",
    name: "sequence",
    id: "lessonNumber",
    label: "Number",
    placeholder: "e.g., 1",
    validation: { required: "Number is required" },
    className: "flex flex-col w-1/6",
  },
  {
    type: "textarea",
    name: "content",
    id: "description",
    label: "Description",
    placeholder: "Add a description for the lesson",
    className: "mt-4 relative w-full",
  },
];
