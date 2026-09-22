"use client";
import { useState, useEffect } from "react";
import styles from "./Game2048.module.css";

const SIZE = 4;
const COLORS = {
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edcc61",
  1024: "#edcc61",
  2048: "#edcc61",
};

export default function Game2048() {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initGame = () => {
    let newGrid = Array(SIZE * SIZE).fill(0);
    newGrid = addRandomTile(addRandomTile(newGrid));
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const addRandomTile = (currentGrid) => {
    const empty = currentGrid.map((val, i) => val === 0 ? i : null).filter(val => val !== null);
    if (empty.length === 0) return currentGrid;
    const idx = empty[Math.floor(Math.random() * empty.length)];
    const newGrid = [...currentGrid];
    newGrid[idx] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  };

  const slide = (row) => {
    let arr = row.filter(val => val);
    let newRow = [];
    let addedScore = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === arr[i + 1]) {
        const val = arr[i] * 2;
        newRow.push(val);
        addedScore += val;
        i++;
      } else {
        newRow.push(arr[i]);
      }
    }
    while (newRow.length < SIZE) newRow.push(0);
    return { newRow, addedScore };
  };

  const handleMove = (direction) => {
    if (gameOver) return;

    let currentGrid = [...grid];
    let newGrid = Array(SIZE * SIZE).fill(0);
    let moved = false;
    let totalAddedScore = 0;

    const getIdx = (r, c) => r * SIZE + c;

    for (let i = 0; i < SIZE; i++) {
      let row = [];
      for (let j = 0; j < SIZE; j++) {
        if (direction === 'LEFT') row.push(currentGrid[getIdx(i, j)]);
        if (direction === 'RIGHT') row.push(currentGrid[getIdx(i, SIZE - 1 - j)]);
        if (direction === 'UP') row.push(currentGrid[getIdx(j, i)]);
        if (direction === 'DOWN') row.push(currentGrid[getIdx(SIZE - 1 - j, i)]);
      }

      const { newRow, addedScore } = slide(row);
      totalAddedScore += addedScore;

      for (let j = 0; j < SIZE; j++) {
        if (direction === 'LEFT') newGrid[getIdx(i, j)] = newRow[j];
        if (direction === 'RIGHT') newGrid[getIdx(i, SIZE - 1 - j)] = newRow[j];
        if (direction === 'UP') newGrid[getIdx(j, i)] = newRow[j];
        if (direction === 'DOWN') newGrid[getIdx(SIZE - 1 - j, i)] = newRow[j];
      }
    }

    if (JSON.stringify(currentGrid) !== JSON.stringify(newGrid)) {
      moved = true;
      setScore(prev => prev + totalAddedScore);
      setGrid(addRandomTile(newGrid));
    }

    // Check game over
    if (!moved && !canMove(newGrid)) {
      setGameOver(true);
    }
  };

  const canMove = (g) => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const val = g[i * SIZE + j];
        if (val === 0) return true;
        // Check right
        if (j < SIZE - 1 && val === g[i * SIZE + (j + 1)]) return true;
        // Check down
        if (i < SIZE - 1 && val === g[(i + 1) * SIZE + j]) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") handleMove('UP');
        if (e.key === "ArrowDown") handleMove('DOWN');
        if (e.key === "ArrowLeft") handleMove('LEFT');
        if (e.key === "ArrowRight") handleMove('RIGHT');
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, gameOver]);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <span className={styles.gameTitle}>PIXEL_2048</span>
        <span className={styles.gameScore}>SCORE: {score}</span>
      </div>
      <div className={styles.grid}>
        {grid.map((val, i) => (
          <div 
            key={i} 
            className={styles.cell} 
            style={{ backgroundColor: COLORS[val] || "#ccc0b4" }}
          >
            {val !== 0 ? val : ""}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>GAME OVER</h2>
            <button onClick={initGame} className={styles.resetBtn}>TRY AGAIN</button>
          </div>
        </div>
      )}
    </div>
  );
}
