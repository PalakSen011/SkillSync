export const generateUpdatedCourse = (courseId, courseDetails, modulesCount, lessonsCount) => {
    return {
      course_id: courseId || Date.now(),
      course_title: courseDetails.title,
      category: courseDetails.category,
      status: courseDetails.status,
      is_mandatory: courseDetails.mandatory,
      assignee: "John Doe",
      duration: "30 hours",
      modules: courseId
        ? courseDetails.modules
        : [
            {
              module_id: Date.now() + Math.random(),
              module_name: "Module 1",
              sequence: modulesCount + 1,
              type: "chapter",
              lessons: [
                {
                  lesson_id: Date.now() + Math.random(),
                  lesson_name: `Lesson ${lessonsCount + 1}`,
                  duration: "",
                  sequence: lessonsCount + 1,
                  content: "",
                },
              ],
              test: {
                questions: [
                  {
                    id: "",
                    question: "",
                    options: [
                      { option_id: "", option: "", isCorrect: false },
                      { option_id: "", option: "", isCorrect: false },
                      { option_id: "", option: "", isCorrect: false },
                      { option_id: "", option: "", isCorrect: false },
                    ],
                    type: "test",
                  },
                ],
              },
            },
          ],
    };
  };