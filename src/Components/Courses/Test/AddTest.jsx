import React, { useState, useEffect } from "react";
import TestQuestion from "./TestQuestion";
import { info, add_green } from "../../../Assets/index";

const AddTest = ({ moduleDetails, onSave }) => {
  const [questions, setQuestions] = useState([
    { id: Date.now(), question: "", type: "", options: [] },
  ]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (moduleDetails?.test && Array.isArray(moduleDetails.test)) {
      const formattedQuestions = moduleDetails.test.map((q) => ({
        id: q.id || Date.now(),
        question: q.question || "",
        type: q.type || "",
        options:
          q.options?.map((opt) => ({
            id: opt.option_id || Date.now() + Math.random(),
            label: opt.option || "",
            isCorrect: opt.isCorrect || false,
          })) || [],
      }));
      setQuestions(formattedQuestions);
    }
  }, [moduleDetails]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: Date.now(), question: "", type: "", options: [] },
    ]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleCopyQuestion = (id) => {
    setQuestions((prev) => {
      const questionToCopy = prev.find((q) => q.id === id);
      if (!questionToCopy) return prev;

      const copiedQuestion = {
        ...questionToCopy,
        id: Date.now(),
        options:
          questionToCopy.options?.map((opt) => ({
            ...opt,
            id: Date.now() + Math.random(),
          })) || [],
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
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              options: [
                ...q.options,
                { id: Date.now(), label: "", isCorrect: false },
              ],
            }
          : q
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
    onSave(questions);
  };

  return (
    <div className="m-5 w-full">
      <div className="gap-1 flex">
        <img src={info} alt="info" className="h-5" />
        <p className="text-sm text-neutral-500">
          Create a dynamic test with at least 25 questions!
        </p>
      </div>

      <div className="mt-4 max-h-[400px] overflow-y-auto border border-neutral-300 p-4">
        {questions.map((question) => (
          <TestQuestion
            key={question.id}
            question={question}
            handleQuestionChange={handleQuestionChange}
            handleTypeChange={handleTypeChange}
            handleAddOption={handleAddOption}
            handleCopyQuestion={handleCopyQuestion}
            handleDeleteQuestion={handleDeleteQuestion}
            handleOptionChange={handleOptionChange}
            handleOptionSelect={handleOptionSelect}
            errors={errors}
          />
        ))}
      </div>

      <div className="mt-4">
        <button
          className="text-green-500 flex gap-2"
          onClick={handleAddQuestion}
        >
          <img src={add_green} alt="add" className="h-6" /> Add Questions
        </button>
      </div>

      <div className="flex justify-end mt-5">
        <button className="btn-secondary" onClick={saveTest}>
          Save Test
        </button>
      </div>
    </div>
  );
};

export default AddTest;
