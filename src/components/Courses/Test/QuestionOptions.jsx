import React from "react";
import InputField from "../../../Common/InputField";

const QuestionOptions = ({ question, handleOptionChange, handleOptionSelect }) => {
  return (
    <>
      {question.options?.map((option) => (
        <div key={option.id} className="mt-4 ml-1 flex items-center gap-2">
          <input
            type={question.type}
            id={`option-${option.id}`}
            name={`option-${question.id}`}
            checked={option.isCorrect}
            onChange={() => handleOptionSelect(question.id, option.id)}
            className="w-4 h-4"
          />
          <InputField
            id={`option-${option.id}`}
            label=""
            placeholder="Enter option text"
            value={option.label}
            onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
            className="text-sm text-neutral-500 border px-2 py-1"
          />
        </div>
      ))}
    </>
  );
};

export default QuestionOptions;
