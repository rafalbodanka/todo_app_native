const exampleData = {
  columns: [
    {
      _id: "column1",
      title: "To-Do",
      pendingTasks: [
        {
          _id: "task1",
          title: "Task 1",
          completed: false,
          column: "column1",
          notes: "This is task 1",
          createdAt: "2023-09-26T10:00:00Z",
          updatedAt: "2023-09-26T11:30:00Z",
          responsibleUsers: [
            {
              _id: "user1",
              email: "john@example.com",
              firstName: "John",
              lastName: "Doe",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 1, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-26T10:00:00Z",
              updatedAt: "2023-09-26T10:00:00Z",
            },
          ],
          isEstimated: true,
          difficulty: 2,
          startDate: "2023-09-26",
          endDate: "2023-09-30",
        },
        {
          _id: "task1",
          title: "Task 1",
          completed: false,
          column: "column1",
          notes: "This is task 1",
          createdAt: "2023-09-26T10:00:00Z",
          updatedAt: "2023-09-26T11:30:00Z",
          responsibleUsers: [
            {
              _id: "user1",
              email: "john@example.com",
              firstName: "John",
              lastName: "Doe",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 1, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-26T10:00:00Z",
              updatedAt: "2023-09-26T10:00:00Z",
            },
          ],
          isEstimated: true,
          difficulty: 2,
          startDate: "2023-09-26",
          endDate: "2023-09-30",
        },
        {
          _id: "task1",
          title: "Task 1",
          completed: false,
          column: "column1",
          notes: "This is task 1",
          createdAt: "2023-09-26T10:00:00Z",
          updatedAt: "2023-09-26T11:30:00Z",
          responsibleUsers: [
            {
              _id: "user1",
              email: "john@example.com",
              firstName: "John",
              lastName: "Doe",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 1, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-26T10:00:00Z",
              updatedAt: "2023-09-26T10:00:00Z",
            },
          ],
          isEstimated: true,
          difficulty: 2,
          startDate: "2023-09-26",
          endDate: "2023-09-30",
        },
        {
          _id: "task1",
          title: "Task 1",
          completed: false,
          column: "column1",
          notes: "This is task 1",
          createdAt: "2023-09-26T10:00:00Z",
          updatedAt: "2023-09-26T11:30:00Z",
          responsibleUsers: [
            {
              _id: "user1",
              email: "john@example.com",
              firstName: "John",
              lastName: "Doe",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 1, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-26T10:00:00Z",
              updatedAt: "2023-09-26T10:00:00Z",
            },
          ],
          isEstimated: true,
          difficulty: 2,
          startDate: "2023-09-26",
          endDate: "2023-09-30",
        },
        {
          _id: "task1",
          title: "Task 1",
          completed: false,
          column: "column1",
          notes: "This is task 1",
          createdAt: "2023-09-26T10:00:00Z",
          updatedAt: "2023-09-26T11:30:00Z",
          responsibleUsers: [
            {
              _id: "user1",
              email: "john@example.com",
              firstName: "John",
              lastName: "Doe",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 1, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-26T10:00:00Z",
              updatedAt: "2023-09-26T10:00:00Z",
            },
          ],
          isEstimated: true,
          difficulty: 2,
          startDate: "2023-09-26",
          endDate: "2023-09-30",
        },
        {
          _id: "task1",
          title: "Task 1",
          completed: false,
          column: "column1",
          notes: "This is task 1",
          createdAt: "2023-09-26T10:00:00Z",
          updatedAt: "2023-09-26T11:30:00Z",
          responsibleUsers: [
            {
              _id: "user1",
              email: "john@example.com",
              firstName: "John",
              lastName: "Doe",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 1, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-26T10:00:00Z",
              updatedAt: "2023-09-26T10:00:00Z",
            },
          ],
          isEstimated: true,
          difficulty: 2,
          startDate: "2023-09-26",
          endDate: "2023-09-30",
        },
        {
          _id: "task1",
          title: "Task 1",
          completed: false,
          column: "column1",
          notes: "This is task 1",
          createdAt: "2023-09-26T10:00:00Z",
          updatedAt: "2023-09-26T11:30:00Z",
          responsibleUsers: [
            {
              _id: "user1",
              email: "john@example.com",
              firstName: "John",
              lastName: "Doe",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 1, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-26T10:00:00Z",
              updatedAt: "2023-09-26T10:00:00Z",
            },
          ],
          isEstimated: true,
          difficulty: 2,
          startDate: "2023-09-26",
          endDate: "2023-09-30",
        },
        {
          _id: "task2",
          title: "Task 2",
          completed: false,
          column: "column1",
          notes: "This is task 2",
          createdAt: "2023-09-26T10:00:00Z",
          updatedAt: "2023-09-26T11:30:00Z",
          responsibleUsers: [
            {
              _id: "user1",
              email: "john@example.com",
              firstName: "John",
              lastName: "Doe",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 1, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-26T10:00:00Z",
              updatedAt: "2023-09-26T10:00:00Z",
            },
          ],
          isEstimated: true,
          difficulty: 2,
          startDate: "2023-09-26",
          endDate: "2023-09-30",
        },
        // Add more pending tasks as needed
      ],
      completedTasks: [
        {
          _id: "task3",
          title: "Task 2",
          completed: true,
          column: "column1",
          notes: "This is task 2",
          createdAt: "2023-09-27T09:15:00Z",
          updatedAt: "2023-09-27T11:00:00Z",
          responsibleUsers: [
            {
              _id: "user2",
              email: "jane@example.com",
              firstName: "Jane",
              lastName: "Smith",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 2, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-27T09:15:00Z",
              updatedAt: "2023-09-27T09:15:00Z",
            },
          ],
          isEstimated: false,
          difficulty: 1,
          startDate: "2023-09-28",
          endDate: "2023-09-30",
        },
        // Add more completed tasks as needed
      ],
      showCompletedTasks: true,
    },
    {
      _id: "column2",
      title: "In Progress",
      pendingTasks: [
        {
          _id: "task3",
          title: "Task 3",
          completed: false,
          column: "column2",
          notes: "This is task 3",
          createdAt: "2023-09-28T14:30:00Z",
          updatedAt: "2023-09-29T10:45:00Z",
          responsibleUsers: [
            {
              _id: "user3",
              email: "alice@example.com",
              firstName: "Alice",
              lastName: "Johnson",
              level: "User", // Provide a default value or remove it if it's optional
              userIconId: 3, // Provide a default value or remove it if it's optional
              createdAt: "2023-09-28T14:30:00Z",
              updatedAt: "2023-09-28T14:30:00Z",
            },
          ],
          isEstimated: true,
          difficulty: 3,
          startDate: "2023-09-28",
          endDate: "2023-10-05",
        },
        // Add more pending tasks as needed
      ],
      completedTasks: [],
      showCompletedTasks: false,
    },
    // Add more columns as needed
  ],
  title: "Sample Project",
  users: [
    {
      _id: "user1",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      level: "User", // Provide a default value or remove it if it's optional
      userIconId: 1, // Provide a default value or remove it if it's optional
      createdAt: "2023-09-26T10:00:00Z",
      updatedAt: "2023-09-26T10:00:00Z",
    },
    {
      _id: "user2",
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      level: "User", // Provide a default value or remove it if it's optional
      userIconId: 2, // Provide a default value or remove it if it's optional
      createdAt: "2023-09-27T09:15:00Z",
      updatedAt: "2023-09-27T09:15:00Z",
    },
    {
      _id: "user3",
      email: "alice@example.com",
      firstName: "Alice",
      lastName: "Johnson",
      level: "User", // Provide a default value or remove it if it's optional
      userIconId: 3, // Provide a default value or remove it if it's optional
      createdAt: "2023-09-28T14:30:00Z",
      updatedAt: "2023-09-28T14:30:00Z",
    },
    // Add more users as needed
  ],
  __v: 1,
  _id: "project1",
};

export default exampleData;