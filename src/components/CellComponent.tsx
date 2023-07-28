import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  isSelected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, isSelected, click }) => {
  return (
    <div
      onClick={() => click(cell)}
      className={["cell", cell.color, isSelected ? "selected" : ""].join(" ")}
      style={{ background: cell.available && cell.figure ? "green" : "" }}
    >
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  ); // объединили два класса в одну строку прямо в фигурных скобках и они теперь применяются соответственно к каждой ячейке
};

export default CellComponent;
