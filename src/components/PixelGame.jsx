"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./PixelGame.module.css";

const WIDTH = 320;
const HEIGHT = 200;
const PLAYER_SIZE = 12;
const PLAYER_Y = HEIGHT - 28;

function createObstacle() {
  const size = 8 + Math.floor(Math.random() * 9);
  return {
    x: Math.floor(Math.random() * (WIDTH - size)),
    y: -size,
    size,
    speed: 1.2 + Math.random() * 1.4,
  };
}

export default function PixelGame() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const gameRef = useRef({
    playerX: WIDTH / 2 - PLAYER_SIZE / 2,
    obstacles: [],
    score: 0,
    started: false,
    gameOver: false,
    lastTime: 0,
    spawnTimer: 0,
    keys: { left: false, right: false },
  });
  const [status, setStatus] = useState("ready");
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    Object.assign(gameRef.current, {
      playerX: WIDTH / 2 - PLAYER_SIZE / 2,
      obstacles: [],
      score: 0,
      started: true,
      gameOver: false,
      lastTime: 0,
      spawnTimer: 0,
    });
    setScore(0);
    setStatus("playing");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const draw = (time) => {
      const game = gameRef.current;
      const delta = Math.min((time - game.lastTime) / 16.67 || 1, 2);
      game.lastTime = time;

      context.clearRect(0, 0, WIDTH, HEIGHT);
      context.fillStyle = getComputedStyle(canvas).getPropertyValue("--game-bg").trim();
      context.fillRect(0, 0, WIDTH, HEIGHT);

      context.fillStyle = getComputedStyle(canvas).getPropertyValue("--game-grid").trim();
      for (let x = 0; x < WIDTH; x += 16) context.fillRect(x, 0, 1, HEIGHT);
      for (let y = 0; y < HEIGHT; y += 16) context.fillRect(0, y, WIDTH, 1);

      if (game.started && !game.gameOver) {
        if (game.keys.left) game.playerX -= 2.8 * delta;
        if (game.keys.right) game.playerX += 2.8 * delta;
        game.playerX = Math.max(8, Math.min(WIDTH - PLAYER_SIZE - 8, game.playerX));

        game.spawnTimer += delta;
        if (game.spawnTimer > Math.max(22, 48 - game.score / 8)) {
          game.obstacles.push(createObstacle());
          game.spawnTimer = 0;
        }

        game.obstacles = game.obstacles.filter((obstacle) => {
          obstacle.y += obstacle.speed * delta;
          const overlaps =
            obstacle.x < game.playerX + PLAYER_SIZE &&
            obstacle.x + obstacle.size > game.playerX &&
            obstacle.y < PLAYER_Y + PLAYER_SIZE &&
            obstacle.y + obstacle.size > PLAYER_Y;

          if (overlaps) {
            game.gameOver = true;
            game.started = false;
            setStatus("game-over");
            return false;
          }
          return obstacle.y < HEIGHT + obstacle.size;
        });

        game.score += delta / 60;
        const nextScore = Math.floor(game.score);
        setScore((currentScore) => (currentScore === nextScore ? currentScore : nextScore));
      }

      context.fillStyle = getComputedStyle(canvas).getPropertyValue("--game-obstacle").trim();
      game.obstacles.forEach((obstacle) => {
        context.fillRect(Math.round(obstacle.x), Math.round(obstacle.y), obstacle.size, obstacle.size);
        context.fillStyle = getComputedStyle(canvas).getPropertyValue("--game-highlight").trim();
        context.fillRect(Math.round(obstacle.x) + 2, Math.round(obstacle.y) + 2, 3, 3);
        context.fillStyle = getComputedStyle(canvas).getPropertyValue("--game-obstacle").trim();
      });

      context.fillStyle = getComputedStyle(canvas).getPropertyValue("--game-player").trim();
      context.fillRect(Math.round(game.playerX), PLAYER_Y, PLAYER_SIZE, PLAYER_SIZE);
      context.fillStyle = getComputedStyle(canvas).getPropertyValue("--game-highlight").trim();
      context.fillRect(Math.round(game.playerX) + 3, PLAYER_Y + 3, 3, 3);

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    const setKey = (event, pressed) => {
      if (["ArrowLeft", "a", "A"].includes(event.key)) gameRef.current.keys.left = pressed;
      if (["ArrowRight", "d", "D"].includes(event.key)) gameRef.current.keys.right = pressed;
      if (["ArrowLeft", "ArrowRight", "a", "A", "d", "D"].includes(event.key)) event.preventDefault();
    };
    const onKeyDown = (event) => {
      setKey(event, true);
      if ((event.key === " " || event.key === "Enter") && status !== "playing") startGame();
    };
    const onKeyUp = (event) => setKey(event, false);
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [startGame, status]);

  const setDirection = (direction, pressed) => {
    gameRef.current.keys[direction] = pressed;
  };

  return (
    <section id="play" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.sectionIndex}>02 / Interactive Experiment</span>
          <h2 className={styles.sectionTitle}>Pixel Run</h2>
          <p className={styles.description}>
            A tiny arcade loop built with HTML canvas. Dodge the falling data blocks and see how long you can keep the signal alive.
          </p>
        </div>

        <div className={styles.gameCard}>
          <div className={styles.gameTopline}>
            <span className={styles.gameLabel}>SIGNAL / ACTIVE</span>
            <span className={styles.score}>SCORE {String(score).padStart(3, "0")}</span>
          </div>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            width={WIDTH}
            height={HEIGHT}
            aria-label="Pixel Run game area"
          />
          <div className={styles.controls}>
            <span>MOVE: <kbd className={styles.key}>←</kbd> <kbd className={styles.key}>→</kbd> or <kbd className={styles.key}>A</kbd> <kbd className={styles.key}>D</kbd></span>
            <button className={styles.button} type="button" onClick={startGame}>
              {status === "playing" ? "RESTART" : status === "game-over" ? "TRY AGAIN" : "START GAME"}
            </button>
          </div>
          <div className={styles.touchControls}>
            <button
              className={styles.touchButton}
              type="button"
              aria-label="Move left"
              onPointerDown={() => setDirection("left", true)}
              onPointerUp={() => setDirection("left", false)}
              onPointerLeave={() => setDirection("left", false)}
            >←</button>
            <button
              className={styles.touchButton}
              type="button"
              aria-label="Move right"
              onPointerDown={() => setDirection("right", true)}
              onPointerUp={() => setDirection("right", false)}
              onPointerLeave={() => setDirection("right", false)}
            >→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
