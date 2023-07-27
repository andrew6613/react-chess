// Пишем базовый класс для фигуры

import { Cell } from "../Cell";
import { Colors } from "../Colors";
import logo from "../../assets/black-king.png";

export enum FigureName { // типизируем возможные названия для фигур
  FIGURE = "Фигура",
  KING = "Король",
  BISHOP = "Слон",
  PAWN = "Пешка",
  QUEEN = "Ферзь",
  KNIGHT = "Конь",
  ROOK = "Ладья",
}

export class Figure {
  color: Colors;
  cell: Cell;
  logo: typeof logo | null;
  name: FigureName;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null; // базовый класс, поэтому конкретного изображения фигуры нет
    this.name = FigureName.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    // метод проверяет, может ли фигура пойти на эту клетку
    return true;
  }

  moveFigure(target: Cell) {} // движение фигуры на выбранную клетку
}
