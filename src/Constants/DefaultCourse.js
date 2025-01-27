const courseTemplate = {
    course_id: null,
    course_title: "",
    category: "",
    status: "Draft",
    is_mandatory: false,
    assignee: "John Doe",
    duration: "30 hours",
    modules: [
      {
        module_id: null,
        module_name: "",
        sequence: 1,
        type: "chapter",
        lessons: [
          {
            lesson_id: null,
            lesson_name: "",
            duration: "",
            sequence: 1,
            content: "",
          },
        ],
        test: [
          {
            questions: [
              {
                id: null,
                question: "",
                options: [
                  { option_id: null, option: "", isCorrect: false },
                  { option_id: null, option: "", isCorrect: false },
                  { option_id: null, option: "", isCorrect: false },
                  { option_id: null, option: "", isCorrect: false },
                ],
                type: "test",
              },
            ],
          },
        ],
      },
    ],
  };
  
  export default courseTemplate;
  