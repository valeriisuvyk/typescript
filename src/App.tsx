import "./App.scss";
import Header from "./components/Header";
import AddToDo from "./components/AddTodo";
import ListToDo from "./components/ListToDo";
import styled from "styled-components";
import Statistics from "./components/Statistics";

import { fetchTodos } from "./store/todoSlice";
import { openModalWindow, closeModalWindow } from "./store/modalSlice";
import React from "react";

import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "./hooks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ButtonAddData = styled.button`
  font-size: 22px;
  padding: 3px 6px;
  background: rgb(249, 249, 197);
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid gray;
`;

function App() {
  const dispatch = useAppDispatch();

  const modalIsOpen: boolean = useAppSelector((state) => state.modal.toggle);
  console.log(modalIsOpen);

  return (
    <div className="layoutdiv">
      <div className="Wrapper">
        <Header />
        <ButtonAddData onClick={() => dispatch(fetchTodos())}>
          add from server
        </ButtonAddData>
        <div>
          <ButtonAddData onClick={() => dispatch(openModalWindow())}>
            Add todo
          </ButtonAddData>
        </div>

        <Modal
          appElement={document.getElementById("root") as HTMLElement}
          isOpen={modalIsOpen}
          onRequestClose={() => dispatch(closeModalWindow())}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <AddToDo />
        </Modal>

        <Statistics />
        <ListToDo />
      </div>
    </div>
  );
}

export default App;
