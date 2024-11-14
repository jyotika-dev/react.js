import { useState, useEffect } from 'react';
import GamePieces from './GamePieces';

const GameState = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore')) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollisionType] = useState('');

  const handleGameOver = (type) => {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
    setCollisionType(type); 
  };

  const handlePlayAgain = () => {
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key === 'Enter') {
        handlePlayAgain();
      }
    }
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup: remove the event listener when the component unmounts
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  return (
    <div className='game-container'>
      <p className='score'>Score: {score}</p>
      <p className='highScore'>High Score: {highScore}</p>
      {gameOver && (
        <div className='gameOver'>
          <p>{collision === "wall" ? "Oh you hit the wall" : "Shit you ate yourself"}! <br></br> Game Over! </p> 
          <p className='playAgain'>Press Enter to play again</p> 
        </div>
      )}
      {!gameOver && (
        <GamePieces 
          score={score} 
          setScore={setScore} 
          onGameOver={handleGameOver} 
        />
      )}
    </div>
  );
}

export default GameState;