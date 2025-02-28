import React from "react";
import SelectionField from "./SelectionField";
import RangeSlider from "./RangeSlider";
import { InputField, PasswordField, DropdownField } from "../Common";

const FieldTypeMapper = ({
  fields,
  filters,
  handleMandatoryChange,
  handleCheckboxChange,
  handleRangeChange,
  register,
  errors,
  isSubmitting,
  onChange,
}) => {
  return fields.map((field) => {
    switch (field.type) {
      case "radio":
        return (
          <SelectionField
            key={field.name}
            type="radio"
            name={field.name}
            options={field.options}
            onChange={handleMandatoryChange}
            selected={filters?.[field.name]}
            label={field.label}
          />
        );

      case "checkbox":
        return (
          <SelectionField
            key={field.name}
            type="checkbox"
            name={field.name}
            options={field.options}
            onChange={handleCheckboxChange}
            selected={filters?.[field.name]}
            label={field.label}
          />
        );

      case "range":
        return (
          <div className="mt-3" key={field.name}>
            <RangeSlider
              onChange={(value) => handleRangeChange(field.name, value)}
              message={field.label}
              value={filters?.[field.name]}
              min={field.min}
              max={field.max}
            />
          </div>
        );

      case "text":
      case "email":
      case "number":
        return (
          <InputField
            key={field.name}
            id={field.id || field.name}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            register={register}
            name={field.name}
            onChange={onChange}
            errors={errors}
            disabled={isSubmitting}
            validation={field.validation}
            className={field.className}
            value={filters?.[field.name]}
          />
        );

      case "textarea":
        return (
          <TextAreaField
            key={field.name}
            id={field.id || field.name}
            label={field.label}
            required={!!field.validation?.required}
            errors={errors?.[field.name]}
            value={filters?.[field.name] || ""}
            onChange={onChange}
            className={field.className || "mt-4 relative"}
            placeholder={field.placeholder}
            disabled={isSubmitting}
            rows={field.rows || 5} // Default to 5 rows if not specified
            {...(register && register(field.name, field.validation))}
          />
        );

      case "dropdown":
        return (
          <DropdownField
            key={field.name}
            id={field.name}
            label={field.label}
            required={field.validation?.required}
            error={errors?.[field.name]}
            options={field.options}
            {...(register && register(field.name, field.validation))}
            disabled={isSubmitting}
            className={field.className}
            value={filters?.[field.name]}
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

export default FieldTypeMapper;
