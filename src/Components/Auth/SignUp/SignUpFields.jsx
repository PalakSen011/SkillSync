import React from "react";
import {
  SignUpInputField,
  DropdownField,
  PasswordField,
} from "../../../Common";

const SignUpFields = ({ fields, register, errors, isSubmitting }) => {
  return fields.map((field) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <SignUpInputField
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            name={field.name}
            errors={errors}
            disabled={isSubmitting}
            validation={field.validation}
          />
        );

      case "dropdown":
        return (
          <DropdownField
            key={field.name}
            id={field.name}
            required
            error={errors?.[field.name]}
            options={field.options}
            {...register(field.name, field.validation)}
            disabled={isSubmitting}
            className={field.className}
          />
        );

      case "password":
        return (
          <PasswordField
            key={field.name}
            register={register}
            name={field.name}
            errors={errors}
            disabled={isSubmitting}
            validation={field.validation}
          />
        );

      default:
        return null;
    }
  });
};

export default SignUpFields;
