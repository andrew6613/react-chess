import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blacklogo from "../../assets/black-pawn.png";
import whitelogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
    this.name = FigureName.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;
    const usualStep = target.y === this.cell.y + direction; // Если это обычный ход пешки, то для хода будет доступна клетка по координате Y+1
    const firstStep =
      this.isFirstStep && target.y === this.cell.y + firstStepDirection; // Если у пешки первый ход, то для хода будет доступна клетка по координате Y+2

    if (
      (usualStep || firstStep) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    } // проверка на то, куда может пойти пешка

    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    } // атака пешки по диагонали

    return false;
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
