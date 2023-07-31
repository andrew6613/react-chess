import { useEffect, useState } from "react";

import "./App.css";
import BoardComponent from "./components/BoardComponent";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
  const [board, setBoard] = useState(new Board()); // начальное состояние доски является экземпляром класса Board
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart(); //  положили функцию рестарта в хук useEffect, так как то, что в нем лежит отрабатывает всегда при первом рендеринге
    setCurrentPlayer(whitePlayer);
  }, []);

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  function restart() {
    // функция для рестарта игры
    const newBoard = new Board(); // создаем новую доску
    newBoard.initCells(); // создаем ячейки
    newBoard.addFigures(); // добавляем фигуры
    setBoard(newBoard); // сохраняем чистую пустую доску в наше состояние
    setCurrentPlayer(whitePlayer);
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div className="lost">
        <div className="lost_section">
          <LostFigures title="Черные фигуры" figures={board.lostBlackFigures} />
        </div>
        <div className="lost_section">
          <LostFigures title="Белые фигуры" figures={board.lostWhiteFigures} />
        </div>
      </div>
    </div>
  );
}

export default App;
