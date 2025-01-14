export default  course=[{
    course_title: 'React',
    Category: 'Training',
    status: 'draft',
    is_mandatory: false,
    modules: [
        {
        module_name: 'Module 1',
        sequence: 1,
        type:'chapter',
        lessons: [
            {
            lesson_name: 'lesson 1',
            Duration: '50min',
            sequence: 1,
            content: 'test content'
            },
            {
            lesson_name: 'lesson 2',
            Duration: '50min',
            sequence: 2,
            content: 'test content'
            },
            {
            lesson_name: 'lesson 3',
            Duration: '50min',
            sequence: 3,
            content: 'test content'
            },
        ]
        },
        {
        module_name: 'Module 2',
        sequence: 2,
        type:'chapter',
        lessons: [
            {
            lesson_name: 'lesson 1',
            Duration: '50min',
            sequence: 1,
            content: 'test content'
            },
            {
            lesson_name: 'lesson 2',
            Duration: '50min',
            sequence: 2,
            content: 'test content'
            },
            {
            lesson_name: 'lesson 3',
            Duration: '50min',
            sequence: 3,
            content: 'test content'
            },
        ]
        },
        {
        module_name: 'Test',
        sequence: 3,
        type:'test',
        questions: [
            {
            question: 'QQQQQQ',
            option1:'',
            option2:'',
            option3:'',
            option4:'',
            correct_option:'',
            type:'single-choice'
            },
            {
            question: 'QQQQQQ2222',
            option1:'',
            option2:'',
            option3:'',
            option4:'',
            correct_option:'',
            type:'single-choice'
            }
        ]
        
        },
        
    ]
    }]