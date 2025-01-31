import React, { useState, useEffect } from "react";
import InputField from "../../../Common/InputField";
import DropdownField from "../../../Common/DropdownField";
import { info, add_new, add_green, copy, trash } from "../../../Assets/index";
import { optionTypes } from "../../../Constants/Options";

const AddTest = ({ moduleDetails, onSave }) => {
  console.log("🚀 ~ AddTest ~ moduleDetails:", moduleDetails);
  const [questions, setQuestions] = useState([
    { id: Date.now(), question: "", type: "", options: [] },
  ]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (moduleDetails?.test && Array.isArray(moduleDetails.test)) {
      const formattedQuestions = moduleDetails.test.map((q) => {
        const optionsArray =
          q.options && Array.isArray(q.options)
            ? q.options.map((opt) => ({
                id: opt.option_id || Date.now() + Math.random(),
                label: opt.option || "", // Ensure the option text is populated here
                isCorrect: opt.isCorrect || false, // Assuming `isCorrect` is part of the options
              }))
            : []; // Fallback to empty array if options is not defined or not an array

        return {
          id: q.id || Date.now(),
          question: q.question || "", // Ensure question is populated
          type: q.type || "", // Ensure type is populated
          options: optionsArray, // Options should now be set correctly
        };
      });
      setQuestions(formattedQuestions); // Update the questions state
    } else {
      // In case moduleDetails.test is undefined or not an array, initialize with empty questions
      setQuestions([{ id: Date.now(), question: "", type: "", options: [] }]);
    }
  }, [moduleDetails]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: Date.now(), question: "", type: "", options: [] },
    ]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const handleCopyQuestion = (id) => {
    setQuestions((prev) => {
      const questionToCopy = prev.find((q) => q.id === id);
      if (!questionToCopy) return prev;

      const copiedQuestion = {
        ...questionToCopy,
        id: Date.now(),
        options: questionToCopy.options.map((opt) => ({
          ...opt,
          id: Date.now() + Math.random(),
        })),
      };

      return [...prev, copiedQuestion];
    });
  };

  const handleQuestionChange = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, question: value } : q))
    );
  };

  const handleTypeChange = (id, type) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, type, options: [] } : q))
    );
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleAddOption = (id) => {
    const question = questions.find((q) => q.id === id);
    if (!question.type) {
      setErrors((prev) => ({
        ...prev,
        [id]: "Please select a type before adding options.",
      }));
      return;
    }

    if (question.options.length >= 4) {
      setErrors((prev) => ({
        ...prev,
        [id]: "You can only add up to 4 options.",
      }));
      return;
    }

    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
              ...question,
              options: [
                ...question.options,
                {
                  id: Date.now(),
                  name: "",
                  isCorrect: false,
                },
              ],
            }
          : question
      )
    );
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleOptionChange = (questionId, optionId, label) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((option) =>
                option.id === optionId ? { ...option, label } : option
              ),
            }
          : q
      )
    );
  };

  const handleOptionSelect = (questionId, optionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((option) =>
                option.id === optionId
                  ? { ...option, isCorrect: !option.isCorrect }
                  : option
              ),
            }
          : q
      )
    );
  };

  const saveTest = () => {
    const formattedQuestions = questions.map((q) => ({
      id: q.id,
      question: q.question,
      type: q.type,
      options: q.options.map((opt, index) => ({
        id: opt.id || Date.now() + Math.random(), // Assign a dynamic ID if not already present
        label: opt.label,
        isCorrect: opt.isCorrect,
      })),
    }));
  
    onSave(formattedQuestions);
  };
  
  return (
    <div className="m-5 w-full">
      <div className="gap-1 flex">
        <img src={info} alt="" className="h-5" />
        <p className="text-sm text-neutral-500">
          Create a dynamic test packed with at least 25 engaging questions!
        </p>
      </div>

      <div className="mt-4 max-h-[400px] overflow-y-auto border border-neutral-300 p-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="w-full border mt-6 p-4 border-neutral-300"
          >
            <div className="flex gap-3">
              <div className="flex w-2/3 flex-row">
                <InputField
                  id={`question-${question.id}`}
                  label="Question"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(question.id, e.target.value)
                  }
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

            {question.options.map((option) => (
              <div
                key={option.id}
                className="mt-4 ml-1 flex items-center gap-2"
              >
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
                  onChange={(e) =>
                    handleOptionChange(question.id, option.id, e.target.value)
                  }
                  className="text-sm text-neutral-500 border px-2 py-1"
                />
              </div>
            ))}

            <div className="mt-4 flex gap-1">
              <img src={add_new} alt="add new icon" className="h-6" />
              <button
                className={`text-sm ${
                  question.options.length >= 4
                    ? "text-slate-500 cursor-not-allowed"
                    : "text-black"
                }`}
                onClick={() => handleAddOption(question.id)}
                disabled={question.options.length >= 4}
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
        ))}
      </div>

      <div className="mt-4">
        <button
          className={`text-sm flex gap-2 ${
            questions.length >= 25
              ? "text-slate-500 cursor-not-allowed"
              : "text-green-500"
          }`}
          onClick={handleAddQuestion}
          disabled={questions.length >= 25}
        >
          <img src={add_green} alt="add new icon" className="h-6" />
          Add Questions
        </button>
      </div>

      <div className="flex justify-end mt-5">
        <button className="btn-secondary flex items-end" onClick={saveTest}>
          Save Test
        </button>
      </div>
    </div>
  );
};

export default AddTest;
