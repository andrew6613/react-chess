import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell); // двигаем фигуру на новую клетку, если до этого у нас есть выбранная клетка с фигурой и на новую клетку можно пойти (метод canMove вернул true)
      setSelectedCell(null); // обнуляем ту клетку, где раньше была фигура
      updateBoard(); //  Обновляем доску, чтобы больше не подсвечивались доступные клетки
    } else {
      // Если на кликнутой клетке есть фигура, то мы записываем ее в selectedCell
      setSelectedCell(cell);
    }
  }

  useEffect(() => {
    // Мы хотим сделать так, чтобы клетки, доступные для хода фигуры, подсвечивались каждый раз, когда меняется выбранное поле, поэтому вызываем функцию внутри useEffect'a и указываем в массиве зависимостей переменную с выбранным полем
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    // Функция для перерисовки состояния доски, так как доступные клетки мы обрабатываем внутри модели
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

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
                <CellComponent
                  click={click}
                  cell={cell}
                  key={cell.id}
                  isSelected={
                    cell.x === selectedCell?.x && cell.y === selectedCell?.y
                  }
                />
              )
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default BoardComponent;
