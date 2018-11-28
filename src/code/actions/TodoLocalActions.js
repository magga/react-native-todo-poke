import { ADD_TODO_LOCAL, DELETE_TODO_LOCAL, VIEW_TODO, CLEAR_TODO_LOCAL } from './types';

export const AddTodo = (todo) => {
    return {
        type: ADD_TODO_LOCAL,
        payload: todo
    };
};

export const DeleteTodo = (id) => {
    return {
        type: DELETE_TODO_LOCAL,
        payload: id
    };
};

export const ViewTodo = (todo) => {
    return {
        type: VIEW_TODO,
        payload: todo
    };
};

export const ClearTodo = () => {
    return {
        type: CLEAR_TODO_LOCAL
    };
};
