import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
}

const CellComponent: FC<CellProps> = ({ cell }) => {
  return <div className={["cell", cell.color].join(" ")}></div>; // объединили два класса в одну строку прямо в фигурных скобках и они теперь применяются соответственно к каждой ячейке
};

export default CellComponent;