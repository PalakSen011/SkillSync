import toast from 'react-hot-toast'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const CoursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    currentCourse: null,
    currentModule: null,
    currentLesson: null,
    showModal: false,
  },
  reducers: {
    addCourse: (state, action) => {
      const data = action.payload
      const existingData = state.courses.find((course) => course.course_title === data.course_title)
      if (existingData) {
        toast.error('Data Already Exist')
        console.log('Data Already Exist')
      } else {
        const newCourse = {
          ...data,

          modules: [
            {
              module_id: uuidv4(),
              module_name: `Module ${data.modules?.length + 1 || 1}`,
              sequence: data.modules?.length + 1 || 1,
              type: 'chapter',
              lessons: [
                {
                  lesson_id: uuidv4(),
                  lesson_name: `Lesson ${data.lessons?.length + 1 || 1}`,
                  Duration: '50min',
                  sequence: data.lessons?.length + 1 || 1,
                  content: 'test content',
                },
              ],
            },
          ],
        }
        state.courses.push(newCourse)
        state.currentCourse = newCourse
        state.currentModule = newCourse.modules[0]
        state.currentLesson = newCourse.modules[0]?.lessons[0]

        console.log('courses', JSON.stringify(state.courses))
        console.log('currentCourse', JSON.stringify(state.currentCourse))
        console.log('currentModule', state.currentModule)
        console.log('currentLesson', state.currentLesson)
      }
    },
    addModule: (state) => {
      if (state.currentCourse) {
        const targetCourse = state.courses.find((c) => c.course_id === state.currentCourse.course_id)
        if (targetCourse) {
          const newModuleNumber = targetCourse.modules.length + 1
          const newModule = {
            module_id: uuidv4(),
            module_name: `Module ${newModuleNumber}`,
            sequence: newModuleNumber,
            type: 'chapter',
            lessons: [
              {
                lesson_id: uuidv4(),
                lesson_name: `Lesson ${targetCourse.modules?.lessons?.length + 1 || 1}`,
                Duration: '50min',
                sequence: targetCourse.lessons?.length + 1 || 1,
                content: 'test content',
              },
            ],
          }
          targetCourse.modules.push(newModule)
          state.currentCourse = targetCourse
          state.currentModule = newModule
          state.currentLesson = newModule.lessons[0]
        }
      }
    },
    setCurrentCourse: (state, action) => {
      const course = state.courses.find((c) => c.course_id === action.payload.course_id)
      state.currentCourse = course || null
    },
    setCurrentModule: (state, action) => {
      const module = state.currentCourse?.modules.find((m) => m.module_id === action.payload.module_id)
      state.currentModule = module || null
    },
    setCurrentLesson: (state, action) => {
      const lesson = state.currentModule?.lessons.find((l) => l.lesson_id === action.payload.lesson_id)
      state.currentLesson = lesson || null
    },
    setShowModal: (state) => {
      state.showModal = !state.showModal
    },
    addLesson: (state) => {
      if (state.currentModule && state.currentCourse) {
        const targetCourse = state.courses.find((c) => c.course_id === state.currentCourse.course_id)
        if (targetCourse) {
          const targetModule = targetCourse.modules.find((m) => m.module_id === state.currentModule.module_id)
          if (targetModule) {
            const newLesson = {
              lesson_id: uuidv4(),
              lesson_name: `Lesson ${targetModule.lessons?.length + 1 || 1}`,
              Duration: '50min',
              sequence: targetModule.lessons?.length + 1 || 1,
              content: 'test content',
            }
            targetModule.lessons.push(newLesson)
            state.currentModule = targetModule
            state.currentLesson = newLesson
          }

        }
      }
      console.log('courses', JSON.stringify(state.courses))
      console.log('currentCourse', JSON.stringify(state.currentCourse))
      console.log('currentModule', state.currentModule)
      console.log('currentLesson', state.currentLesson)
    },
    editModule : (state, action) => {
      const {module_name , number} = action.payload;
      console.log(module_name)
      console.log(number)
      const targetCourse = state.courses.find((c) => c.course_id === state.currentCourse.course_id)
      if(targetCourse){
        const targetModule = targetCourse.modules.find((m) => m.module_id === state.currentModule.module_id)
        targetModule.module_name = `${module_name} ${number}`
        targetModule.sequence = number
        state.currentModule = targetModule
        toast.success("Module name edited successfully!")
      }
      console.log('courses', JSON.stringify(state.courses))
      console.log('currentCourse', JSON.stringify(state.currentCourse))
      console.log('currentModule', state.currentModule)
      console.log('currentLesson', state.currentLesson)
      

    }
  },
})

export const { addCourse, addModule, setCurrentCourse, setShowModal, addLesson, setCurrentModule, setCurrentLesson, editModule } =
  CoursesSlice.actions

export default CoursesSlice.reducer
