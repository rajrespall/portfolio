"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./SnakeGame.module.css";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const dirRef = useRef(DIRECTIONS.RIGHT);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    dirRef.current = DIRECTIONS.RIGHT;
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case "ArrowUp": if (dirRef.current !== DIRECTIONS.DOWN) dirRef.current = DIRECTIONS.UP; break;
        case "ArrowDown": if (dirRef.current !== DIRECTIONS.UP) dirRef.current = DIRECTIONS.DOWN; break;
        case "ArrowLeft": if (dirRef.current !== DIRECTIONS.RIGHT) dirRef.current = DIRECTIONS.LEFT; break;
        case "ArrowRight": if (dirRef.current !== DIRECTIONS.LEFT) dirRef.current = DIRECTIONS.RIGHT; break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver || !gameStarted) return;

    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        const currentDir = dirRef.current;
        const newHead = {
          x: (prevSnake[0].x + currentDir.x + GRID_SIZE) % GRID_SIZE,
          y: (prevSnake[0].y + currentDir.y + GRID_SIZE) % GRID_SIZE,
        };

        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);

    return () => clearInterval(moveSnake);
  }, [food, gameOver, gameStarted, generateFood]);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <span className={styles.gameTitle}>PIXEL_SNAKE</span>
        <span className={styles.gameScore}>SCORE: {score}</span>
      </div>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              className={`${styles.cell} ${isSnake ? styles.snake : ""} ${isFood ? styles.food : ""}`}
            />
          );
        })}
      </div>
      {(!gameStarted || gameOver) && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>{gameOver ? "GAME OVER" : "SNAKE_OS"}</h2>
            <button onClick={resetGame} className={styles.resetBtn}>
              {gameOver ? "REBOOT" : "START_SYSTEM"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
