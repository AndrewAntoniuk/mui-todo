import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: {},
  },
  reducers: {
    addTodo: (state, action) => {
      const { name, id, info } = action.payload;
      state.todos[id] = {
        name: name,
        id: id,
        info: info,
        isCompleted: false,
      };
    },
    toggleComplete: (state, action) => {
      const { id, isCompleted } = action.payload;
      state.todos[id] = {
        ...state.todos[id],
        isCompleted: !isCompleted,
      };
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      delete state.todos[id];
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const addTodo = todosSlice.actions.addTodo;
export const selectTodos = (state) => state.todos.todos;
export const selectTodo = (state) => state.todos.todos.id;
export const toggleComplete = todosSlice.actions.toggleComplete;
export const deleteTodo = todosSlice.actions.deleteTodo;
