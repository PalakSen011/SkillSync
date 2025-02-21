import React from "react";
import { InputField, PasswordField } from "../../../Common";

const SignInFields = ({ fields, register, errors, isSubmitting ,onChange}) => {
  return fields.map((field) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <InputField
            id={field.id}
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            name={field.name}
            onChange={onChange}
            errors={errors}
            disabled={isSubmitting}
            validation={field.validation}
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

export default SignInFields;
