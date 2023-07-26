import React, { FC, Fragment } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  return (
    <div className="board">
      {board.cells.map(
        (
          row,
          index // Мы получили через пропсы саму доску с массивом ceils, который содержит наши ячейки. Теперь надо их отрисовать с помощью map
        ) => (
          <React.Fragment key={index}>
            {row.map(
              (
                cell //  еще раз пробегаем мапом т.к. row это тоже массив
              ) => (
                <CellComponent cell={cell} key={cell.id} />
              )
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default BoardComponent;
