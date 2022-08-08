import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randColor } from "../randColor";
import { v4 as uuidv4 } from 'uuid';

type Todo = { id: string; title: string; status: boolean; color: string };

type TodoFetch = {
  id: string;
  text: string;
  isCompleted: boolean;
};

type EditTodo = {
  id: string;
  value: string;
};

export interface CounterState {
  todos: Todo[];
  edit: null | string;
  deleted: number;
  created: number;
  edited: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  todos: [],
  edit: null,
  deleted: 0,
  created: 0,
  edited: 0,
  status: "idle",
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function () {
    const response = await fetch(
      "https://gist.githubusercontent.com/alexandrtovmach/0c8a29b734075864727228c559fe9f96/raw/c4e4133c9658af4c4b3474475273b23b4a70b4af/todo-task.json"
    );

    const data = await response.json();

    return data.map((obj: TodoFetch) => {
      return {
        title: obj.text,
        id: uuidv4(),
        status: obj.isCompleted,
        color: `rgb(${randColor(150, 255)}, ${randColor(150, 255)}, ${randColor(
          150,
          255
        )})`,
      };
    });
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    saveTodo(state, action: PayloadAction<string>) {
      if (action.payload.trim()) {
        state.todos.push({
          id: new Date().toISOString(),
          title: action.payload,
          status: true,
          color: `rgb(${randColor(150, 255)}, ${randColor(150, 255)}, ${randColor(
            150,
            255
          )})`,
        });
        state.created += 1;
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.deleted += 1;
    },
    editTodo(state, action: PayloadAction<string>) {
      state.edit = action.payload;
    },
    setEditTodo(state) {
      state.edit = null;
    },

    saveEditTodo(state, action: PayloadAction<EditTodo>) {
      const newTodo = state.todos.map((item: Todo) => {
        let title = item.title;
        if (item.id === action.payload.id) {
          item.title = action.payload.value;
          if (title !== item.title) state.edited += 1;
        }

        return item;
      });

      state.todos = newTodo;
    },
    deleteAllTodos(state) {
      state.deleted += state.todos.length;
      state.todos = [];
    },
    clearDeletedTodos(state) {
      state.deleted = 0;
    },
    clearCreatedTodos(state) {
      state.created = 0;
    },
    clearEditedTodos(state) {
      state.edited = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = state.todos.concat(action.payload);
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  saveTodo,
  deleteTodo,
  editTodo,
  saveEditTodo,
  setEditTodo,
  deleteAllTodos,
  clearDeletedTodos,
  clearCreatedTodos,
  clearEditedTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
