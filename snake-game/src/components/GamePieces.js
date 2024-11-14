import { useEffect, useRef, useState } from "react";

const GamePieces = ({ score, setScore, onGameOver }) => {
  const canvasRef = useRef();

  const snakeSpeed = 10;
  const [apple, setApple] = useState({ x: 180, y: 100 });
  const [snake, setSnake] = useState([
    { x: 100, y: 50 },
    { x: 95, y: 50 }
  ]);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const snakeDraw = () => {
      snake.forEach((snakePart) => { 
        ctx.beginPath();
        ctx.rect(snakePart.x, snakePart.y, 14, 14);
        ctx.fillStyle = "#90EE90";
        ctx.fill();
        ctx.closePath();
      });
    };

    const appleDraw = () => {
      ctx.beginPath();
      ctx.rect(apple.x, apple.y, 14, 14);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    };

    const moveSnake = () => {
      if (direction) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };

          for (let i = newSnake.length - 1; i > 0; i--) {
            newSnake[i].x = newSnake[i - 1].x;
            newSnake[i].y = newSnake[i - 1].y;
          }

          switch (direction) {
            case 'right':
              snakeHead.x += snakeSpeed;
              break;
            case 'left':
              snakeHead.x -= snakeSpeed;
              break;
            case 'up':
              snakeHead.y -= snakeSpeed;
              break;
            case 'down':
              snakeHead.y += snakeSpeed;
              break;
            default:
              break;
          }

          newSnake[0] = snakeHead;
          handleAppleCollision(newSnake); 
          handleWallCollision(snakeHead);
          handleBodyCollision(newSnake); 

          return newSnake; 
        });
      }
    };

    const handleBodyCollision = (newSnake) => { 
      const snakeHead = newSnake[0];
      for (let i = 1; i < newSnake.length; i++) {
        if (snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y) {
          onGameOver('self');
        }
      }
    };

    const handleWallCollision = (snakeHead) => {
      if (
        snakeHead.x < 0 || 
        snakeHead.x >= canvas.width || 
        snakeHead.y < 0 || 
        snakeHead.y >= canvas.height
      ) {
        onGameOver('wall');
      }
    };

    const handleAppleCollision = (newSnake) => { 
      const snakeHead = newSnake[0];

      if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
        setScore(prevScore => prevScore + 1); 
        setApple({
          x: Math.floor((Math.random() * canvas.width) / snakeSpeed) * snakeSpeed,
          y: Math.floor((Math.random() * canvas.height) / snakeSpeed) * snakeSpeed
        });

        newSnake.push({ 
          x: newSnake[newSnake.length - 1].x,  
          y: newSnake[newSnake.length - 1].y 
        });
      }
    };

    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowRight':
          setDirection('right');
          break;
        case 'ArrowLeft':
          setDirection('left');
          break;
        case 'ArrowUp':
          setDirection('up');
          break;
        case 'ArrowDown':
          setDirection('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snakeDraw();
      appleDraw();
      moveSnake();
    }, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [snake, direction, score, onGameOver, apple]); 

  return (
    <div>
      <canvas className="gameCanvas" ref={canvasRef} width={750} height={420} />
    </div>
  );
};

export default GamePieces;