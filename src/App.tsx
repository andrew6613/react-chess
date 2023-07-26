import React, { useEffect } from "react";

import "./App.css";
import BoardComponent from "./components/BoardComponent";
import { Board } from "./models/Board";

function App() {
  const [board, setBoard] = React.useState(new Board()); // начальное состояние доски является экземпляром класса Board

  useEffect(() => {
    restart(); //  положили функцию рестарта в хук useEffect, так как то, что в нем лежит отрабатывает всегда при первом рендеринге
  }, []);

  function restart() {
    // функция для рестарта игры
    const newBoard = new Board(); // создаем новую доску
    newBoard.initCells(); // создаем ячейки
    setBoard(newBoard); // сохраняем чистую пустую доску в наше состояние
  }

  return (
    <div className="app">
      <BoardComponent />
    </div>
  );
}

export default App;
