import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
  readonly x: number; // координаты ячейки меняться не могут, поэтому они только для чтения
  readonly y: number;
  readonly color: Colors; // один из цветов, который задан через enum Colors
  figure: Figure | null;
  board: Board;
  available: boolean; // можем ли мы пойти на данную клетку фигурой
  id: number;
  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = Math.random();
  }

  moveFigure(target: Cell) {
    // метод для движения фигуры
    if (this.figure && this.figure?.canMove(target)) {
      // условие: если на поле есть фигура и метод canMove для выбранной ячейки возвращает true , то фигура перемещается на выбранное поле
      this.figure.moveFigure(target);
      target.figure = this.figure;
      this.figure = null;
    }
  }
}
