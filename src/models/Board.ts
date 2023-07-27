import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
  cells: Cell[][] = []; // доска будет состоять из ячеек, расположеных по горизонтали и вертикали. с точки зрения js это двумерный массив, поэтому в типизации мы указываем, что cells будет массивом с массивами

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []; // первым циклом мы пробегаем по ряду. один ряд это один массив, поэтому типизируем как обычный массив, состоящий из ячеек Cell. изначально пустой, затем туда пушим ряды по 8 клеток
      for (let j = 0; j < 8; j++) {
        // нам нужен второй цикл, который будет заполнять каждый ряд белыми и черными клетками
        if ((i + j) % 2 !== 0) {
          // проверяем четная клетка или нечетная по счету и в зависимости от этого делаем ее черной или белой
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // black cells. В самом классе Cell мы задали в конструктор определенные свойства. Теперь при создании экземпляра ячейки мы передаем эти свойства в том же поряке
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // white cells
        }
      }
      // когда внешний цикл завершается, мы имеем готовый ряд клеток и теперь нам нужно положить его в массив cells, который типизировали как массив с массивами
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    // метод принимает в себя необходимые нам координаты возращает координаты клетки и отдает ячейку из массива cells с такими же координатами
    return this.cells[y][x];
  }

  //  Реализуем логику добавления фигур на доску

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  // Метод добавляет все фигуры на доску сразу. Его мы вызываем в функции restart

  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addQueens();
    this.addBishops();
    this.addKnights();
    this.addRooks();
  }
}
