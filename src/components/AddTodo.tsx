import React, { useState } from "react";
import "../App.scss";
import { useAppDispatch } from "../hooks";
import { saveTodo } from "../store/todoSlice";
import { closeModalWindow } from "../store/modalSlice";
import styled from "styled-components";

const ButtonSave = styled.button`
  color: white;
  margin-left: 5px;
  background-color: rgb(60, 179, 113);
  border-radius: 5px;
  border: 2px solid grey;
`;

const InputTask = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid grey;
  :placeholder {
    color: red;
  }
`;

const AddTooDo = () => {
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const addTask = () => {
    dispatch(saveTodo(value));
    setValue("");
    if (value.trim()) {
      dispatch(closeModalWindow());
    }
  };

  return (
    <div className="Layout">
      <div className="Input">
        <InputTask
          placeholder="type your task"
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
        />
        <ButtonSave onClick={addTask}>Save</ButtonSave>
      </div>
    </div>
  );
};

export default AddTooDo;
