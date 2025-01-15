const courses = [
  {
    course_title: 'React',
    category: 'Training',
    status: 'Draft',
    is_mandatory: false,
    assignee: 'John Doe',
    duration: '30 hours',
    modules: [
      {
        module_name: 'Module 1',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'lesson 1', Duration: '50min', sequence: 1, content: 'test content' },
          { lesson_name: 'lesson 2', Duration: '50min', sequence: 2, content: 'test content' },
          { lesson_name: 'lesson 3', Duration: '50min', sequence: 3, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'JavaScript Basics',
    category: 'Training',
    status: 'Inactive',
    is_mandatory: true,
    assignee: 'Jane Smith',
    duration: '20 hours',
    modules: [
      {
        module_name: 'Introduction to JavaScript',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Variables and Data Types', Duration: '40min', sequence: 1, content: 'test content' },
          { lesson_name: 'Functions and Scope', Duration: '60min', sequence: 2, content: 'test content' }
        ]
      },
      {
        module_name: 'Control Flow',
        sequence: 2,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Conditionals', Duration: '45min', sequence: 1, content: 'test content' },
          { lesson_name: 'Loops', Duration: '55min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Node.js for Beginners',
    category: 'Training',
    status: 'Active',
    is_mandatory: false,
    assignee: 'Michael Brown',
    duration: '25 hours',
    modules: [
      {
        module_name: 'Introduction to Node.js',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'What is Node.js?', Duration: '60min', sequence: 1, content: 'test content' },
          { lesson_name: 'Installing Node.js', Duration: '40min', sequence: 2, content: 'test content' }
        ]
      },
      {
        module_name: 'Working with File System',
        sequence: 2,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Reading Files', Duration: '50min', sequence: 1, content: 'test content' },
          { lesson_name: 'Writing Files', Duration: '60min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Python for Data Science',
    category: 'Training',
    status: 'Active',
    is_mandatory: true,
    assignee: 'Emily Clark',
    duration: '40 hours',
    modules: [
      {
        module_name: 'Introduction to Python',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Python Syntax', Duration: '50min', sequence: 1, content: 'test content' },
          { lesson_name: 'Data Structures', Duration: '60min', sequence: 2, content: 'test content' }
        ]
      },
      {
        module_name: 'Data Analysis with Python',
        sequence: 2,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Using Pandas', Duration: '75min', sequence: 1, content: 'test content' },
          { lesson_name: 'Data Visualization with Matplotlib', Duration: '80min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Advanced CSS and HTML',
    category: 'Training',
    status: 'Active',
    is_mandatory: false,
    assignee: 'Anna Lee',
    duration: '15 hours',
    modules: [
      {
        module_name: 'CSS Fundamentals',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'CSS Basics', Duration: '45min', sequence: 1, content: 'test content' },
          { lesson_name: 'Flexbox', Duration: '55min', sequence: 2, content: 'test content' }
        ]
      },
      {
        module_name: 'Responsive Design',
        sequence: 2,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Media Queries', Duration: '40min', sequence: 1, content: 'test content' },
          { lesson_name: 'Grid Layout', Duration: '50min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Introduction to Machine Learning',
    category: 'Training',
    status: 'Draft',
    is_mandatory: true,
    assignee: 'David Wilson',
    duration: '50 hours',
    modules: [
      {
        module_name: 'Fundamentals of Machine Learning',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Supervised Learning', Duration: '60min', sequence: 1, content: 'test content' },
          { lesson_name: 'Unsupervised Learning', Duration: '70min', sequence: 2, content: 'test content' }
        ]
      },
      {
        module_name: 'Deep Learning',
        sequence: 2,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Neural Networks', Duration: '80min', sequence: 1, content: 'test content' },
          { lesson_name: 'Convolutional Neural Networks', Duration: '90min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'DevOps Essentials',
    category: 'Training',
    status: 'Inactive',
    is_mandatory: true,
    assignee: 'Sophia Turner',
    duration: '35 hours',
    modules: [
      {
        module_name: 'Introduction to DevOps',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'DevOps Culture', Duration: '50min', sequence: 1, content: 'test content' },
          { lesson_name: 'Automation', Duration: '60min', sequence: 2, content: 'test content' }
        ]
      },
      {
        module_name: 'CI/CD Pipeline',
        sequence: 2,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Version Control Systems', Duration: '40min', sequence: 1, content: 'test content' },
          { lesson_name: 'Jenkins', Duration: '55min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Angular for Beginners',
    category: 'Training',
    status: 'Active',
    is_mandatory: false,
    assignee: 'Alice Walker',
    duration: '28 hours',
    modules: [
      {
        module_name: 'Introduction to Angular',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Setting up Angular Environment', Duration: '45min', sequence: 1, content: 'test content' },
          { lesson_name: 'Angular Components', Duration: '60min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Advanced React Patterns',
    category: 'Training',
    status: 'Active',
    is_mandatory: false,
    assignee: 'John Smith',
    duration: '35 hours',
    modules: [
      {
        module_name: 'Higher-Order Components',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'What are HOCs?', Duration: '45min', sequence: 1, content: 'test content' },
          { lesson_name: 'Building Custom HOCs', Duration: '50min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Web Development with Django',
    category: 'Training',
    status: 'Active',
    is_mandatory: true,
    assignee: 'Lucas Green',
    duration: '40 hours',
    modules: [
      {
        module_name: 'Django Basics',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Setting up Django', Duration: '50min', sequence: 1, content: 'test content' },
          { lesson_name: 'Creating Models', Duration: '60min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Java for Enterprise Applications',
    category: 'Training',
    status: 'Active',
    is_mandatory: true,
    assignee: 'Sarah Johnson',
    duration: '50 hours',
    modules: [
      {
        module_name: 'Java EE Basics',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Introduction to Java EE', Duration: '60min', sequence: 1, content: 'test content' },
          { lesson_name: 'Creating Enterprise Beans', Duration: '70min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Ruby on Rails for Web Development',
    category: 'Training',
    status: 'Inactive',
    is_mandatory: false,
    assignee: 'George King',
    duration: '30 hours',
    modules: [
      {
        module_name: 'Ruby Basics',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Ruby Syntax', Duration: '50min', sequence: 1, content: 'test content' },
          { lesson_name: 'Ruby Arrays', Duration: '60min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Blockchain for Developers',
    category: 'Training',
    status: 'Draft',
    is_mandatory: true,
    assignee: 'Matthew Clark',
    duration: '45 hours',
    modules: [
      {
        module_name: 'Blockchain Basics',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Understanding Blockchain', Duration: '60min', sequence: 1, content: 'test content' },
          { lesson_name: 'Creating Smart Contracts', Duration: '75min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Mobile App Development with Flutter',
    category: 'Training',
    status: 'Active',
    is_mandatory: false,
    assignee: 'David Walker',
    duration: '40 hours',
    modules: [
      {
        module_name: 'Flutter Introduction',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Setting up Flutter', Duration: '50min', sequence: 1, content: 'test content' },
          { lesson_name: 'Building First Flutter App', Duration: '60min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  },
  {
    course_title: 'Data Structures and Algorithms',
    category: 'Training',
    status: 'Active',
    is_mandatory: true,
    assignee: 'Olivia Davis',
    duration: '60 hours',
    modules: [
      {
        module_name: 'Introduction to Data Structures',
        sequence: 1,
        type: 'chapter',
        lessons: [
          { lesson_name: 'Arrays and Linked Lists', Duration: '75min', sequence: 1, content: 'test content' },
          { lesson_name: 'Stacks and Queues', Duration: '80min', sequence: 2, content: 'test content' }
        ]
      }
    ]
  }
];

export default courses;
