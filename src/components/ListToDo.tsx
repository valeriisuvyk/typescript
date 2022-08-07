import { useState } from "react";
import styled from "styled-components";
import "../App.scss";

import {
  deleteTodo,
  editTodo,
  saveEditTodo,
  setEditTodo,
} from "../store/todoSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const ButtonDelete = styled.button`
  border: none;
  border-radius: 7px;
  padding: 3px;
  color: white;
  background-color: rgb(255, 69, 0);
  margin-right: 5px;
`;

const Input = styled.input`
  width: 400px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const ButtonEdit = styled.button`
  padding: 3px;
  border: 1px solid gray;
  border-radius: 7px;
  color: white;
  background-color: gray;
`;

const ButtonSave = styled.button`
  padding: 3px 15px;
  border: 1px solid gray;
  border-radius: 7px;
  color: white;
  background-color: rgb(60, 179, 113);
  margin-left: 10px;
`;

const ListToDo = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const edit = useAppSelector((state) => state.todos.edit);

  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const changeTodo = (id: string, title: string) => {
    dispatch(editTodo(id));
    setValue(title);
  };

  const deletetodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const saveTodo = (id: string) => {
    dispatch(saveEditTodo({ value, id }));
    dispatch(setEditTodo());
  };

  type Todo = { id: string; title: string; status: boolean; color: string };

  return (
    <div className="Layout">
      {todos.map((item: Todo) => (
        <div
          className="WrapperTodo"
          style={{ backgroundColor: item.color }}
          key={item.id}
        >
          {edit === item.id ? (
            <div>
              <Input value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          ) : (
            <div className="ItemDiv">{item.title}</div>
          )}

          {edit === item.id ? (
            <div>
              <ButtonSave onClick={() => saveTodo(item.id)}>save</ButtonSave>
            </div>
          ) : (
            <div className="DeleteDiv">
              <ButtonDelete onClick={() => deletetodo(item.id)}>
                Delete
              </ButtonDelete>
              <ButtonEdit onClick={() => changeTodo(item.id, item.title)}>
                Edit
              </ButtonEdit>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListToDo;
