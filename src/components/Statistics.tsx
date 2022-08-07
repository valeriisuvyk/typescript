import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  clearCreatedTodos,
  clearDeletedTodos,
  clearEditedTodos,
  deleteAllTodos,
} from "../store/todoSlice";

const ButtonDeleteAllTodos = styled.button`
  padding: 0px;
  background: rgb(249, 249, 197);
  border-radius: 7px;
  border: 1px solid gray;
  padding-left: 5px;
  padding-right: 5px;
`;

const ButtonDeleteStatistic = styled.button`
  padding: 0px;
  background: rgb(249, 249, 197);
  border-radius: 7px;
  border: 1px solid gray;
  padding-left: 5px;
  padding-right: 5px;
`;

export default function Statistics() {
  const length = useAppSelector((state) => state.todos.todos).length;
  const created = useAppSelector((state) => state.todos.created);
  const deleted = useAppSelector((state) => state.todos.deleted);
  const edited = useAppSelector((state) => state.todos.edited);

  const dispatch = useAppDispatch();

  return (
    <div className="StatisticDiv">
      <p className="statistic">Statistic:</p>

      <div className="StatisticWrapper">
        <p>already you have {length} todos</p>
        <ButtonDeleteAllTodos onClick={() => dispatch(deleteAllTodos())}>
          Clear all todos
        </ButtonDeleteAllTodos>
      </div>
      <div className="StatisticWrapper">
        <p> Created {created} todos </p>

        <ButtonDeleteStatistic onClick={() => dispatch(clearCreatedTodos())}>
          Reset
        </ButtonDeleteStatistic>
      </div>
      <div className="StatisticWrapper">
        <p> Deleted {deleted} todos</p>

        <ButtonDeleteStatistic onClick={() => dispatch(clearDeletedTodos())}>
          Reset
        </ButtonDeleteStatistic>
      </div>

      <div className="StatisticWrapper">
        <p> Edited {edited} todos</p>
        <ButtonDeleteStatistic onClick={() => dispatch(clearEditedTodos())}>
          Reset
        </ButtonDeleteStatistic>
      </div>
    </div>
  );
}
