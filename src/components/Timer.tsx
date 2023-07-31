import React, { FC, useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback =
      currentPlayer?.color === Colors.BLACK ? blackIncrement : whiteIncrement;
    timer.current = setInterval(callback, 1000);
  }

  function restartGame() {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  function blackIncrement() {
    setBlackTime((prev) => prev - 1);
  }

  function whiteIncrement() {
    setWhiteTime((prev) => prev - 1);
  }

  return (
    <div>
      <button onClick={restartGame}>Restart game</button>
      <h3>У черных: {blackTime} секунд</h3>
      <h3>У белых: {whiteTime} секунд</h3>
    </div>
  );
};

export default Timer;
