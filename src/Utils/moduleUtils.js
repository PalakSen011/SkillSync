export const createNewModule = (moduleName, modules) => {
    const moduleId = Date.now();
    
    return {
      module_id: moduleId,
      module_name: moduleName,
      sequence: modules.length + 1,
      type: "chapter",
      lessons: [
        {
          lesson_id: Date.now(),
          lesson_name: "Lesson 1",
          duration: "",
          sequence: 1,
          content: "",
        },
      ],
      test: [
        {
          questions: [
            {
              id: Date.now().toString(),
              question: "",
              options: Array(4).fill({
                option_id: "",
                option: "",
                isCorrect: false,
              }),
              type: "test",
            },
          ],
        },
      ],
    };
  };
  