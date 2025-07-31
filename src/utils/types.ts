interface User {
    username: string;
    password: string;
}

interface Todo {
    title: string;
    description: string;
    completed: string;
    user_id: User_Id
}

type User_Id = number;

export {
    User, Todo, User_Id
}