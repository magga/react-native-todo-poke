import _ from 'lodash';

import { ADD_TODO_LOCAL, DELETE_TODO_LOCAL, VIEW_TODO, CLEAR_TODO_LOCAL } from './../actions/types';

const INITIAL_STATE = {
    allTodo: [],
    currentTodo: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TODO_LOCAL: 
            return { ...state, allTodo: [...state.allTodo, action.payload] };
        case DELETE_TODO_LOCAL:
            return { ...state, allTodo: _.filter(state.allTodo, (o) => o.id !== action.payload) };
        case VIEW_TODO:
            return { ...state, currentTodo: action.payload };
        case CLEAR_TODO_LOCAL:
            return INITIAL_STATE;
        default:
            return state;
    }
};
