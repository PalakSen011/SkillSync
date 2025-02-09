import React from "react";
import InputField from "../../../Common/InputField";
import DropdownField from "../../../Common/DropdownField";
import QuestionOptions from "./QuestionOptions";
import { optionTypes } from "../../../Constants/Options";
import { copy, trash } from "../../../Assets/index";

const TestQuestion = ({
  question,
  handleQuestionChange,
  handleTypeChange,
  handleAddOption,
  handleCopyQuestion,
  handleDeleteQuestion,
  handleOptionChange,
  handleOptionSelect,
  errors,
}) => {
  return (
    <div className="w-full border mt-6 p-4 border-neutral-300">
      <div className="flex gap-3">
        <div className="flex w-2/3">
          <InputField
            id={`question-${question.id}`}
            label="Question"
            value={question.question}
            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
            required
          />
        </div>
        <DropdownField
          id={`type-${question.id}`}
          label="Type"
          required
          options={optionTypes}
          value={question.type}
          onChange={(e) => handleTypeChange(question.id, e.target.value)}
          error={errors[question.id]}
          className="w-1/3"
        />
      </div>

      <QuestionOptions
        question={question}
        handleOptionChange={handleOptionChange}
        handleOptionSelect={handleOptionSelect}
      />

      <div className="mt-4 flex gap-1">
        <button
          className={`text-sm ${
            question.options?.length >= 4
              ? "text-slate-500 cursor-not-allowed"
              : "text-black"
          }`}
          onClick={() => handleAddOption(question.id)}
          disabled={question.options?.length >= 4}
        >
          Add Option
        </button>
      </div>

      {errors[question.id] && (
        <p className="text-xs mt-2 text-red-500">{errors[question.id]}</p>
      )}

      <hr className="m-6 h-px border bg-neutral-500" />

      <div className="mt-4 flex gap-4 justify-end">
        <img
          src={copy}
          alt="copy icon"
          className="h-8 cursor-pointer"
          onClick={() => handleCopyQuestion(question.id)}
        />
        <img
          src={trash}
          alt="trash icon"
          className="h-6 cursor-pointer"
          onClick={() => handleDeleteQuestion(question.id)}
        />
      </div>
    </div>
  );
};

export default TestQuestion;
