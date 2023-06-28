//Getting the sounds for winning and losing.
import winSound from '../assets/audio/winSound.wav';
import loseSound from '../assets/audio/loseSound.wav';
//useSelector is used to get the gameState.
import { useSelector } from "react-redux";
//Framer motion is used to animate the showing and hiding of the win and lose screens.
import { AnimatePresence, motion } from "framer-motion";
//We also get the reset game button.
import GameReset from "./GameReset";

//This component checks whether the game is won or lost and displays the appropriate popup window to inform the player.
const WinScreen = () => {
  const gameStateObject = useSelector((state) => state.gameState);

  //We play the winning or losing sound depending on whether the game is won or lost.
  if(!gameStateObject.muted){
    if(gameStateObject.gameOver && gameStateObject.gameWon){
      new Audio(winSound).play()
    } else if (gameStateObject.gameOver && !gameStateObject.gameWon) {
      new Audio(loseSound).play()
    }
  }


  return (
    //Using framer motion requires us to wrap win logic inside of animatePresence if we want it to animate out when it exits.
    <AnimatePresence>
      {/* This short hand if statement checks if the game is won and returns the win-screen if it is won. */}
      {gameStateObject.gameWon && (
        <motion.div
          className="game-won-popup-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="game-won-popup-box"
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            exit={{ scale: 0, rotate: [0, 360], x: [0, 60, 120, 180, 240, 300], y: [0, -40, -100, -180, -100, -40, 0, 0] }}
          >
            <h1>You win!</h1>
            <p>
              Well done, you guessed it with {10 - gameStateObject.lives}{" "}
              incorrect guesses!
            </p>
            <p>The correct word was:</p>
            <h2>{gameStateObject.wordToGuess}</h2>
            <div className='reset-button-container'>
              <GameReset />
            </div>
            
          </motion.div>
        </motion.div>
      )}
      {/* This short hand if statement checks whether the game is over/lost and returns the lose-screen if it is lost. */}
      {!gameStateObject.gameWon && gameStateObject.gameOver && (
        <motion.div
          className="game-lost-popup-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ scale: [0, 1.1, 1] }}
            exit={{ scale: 0, rotate: [0, -360], x: [0, -60, -120, -180, -240, -300], y: [0, -40, -100, -180, -100, -40, 0, 0] }}
            transition={{ duration: 0.3 }}
            className="game-lost-popup-box"
          >
            <h1>You lose!</h1>
            <p>Unfortunately you didn't guess the word.</p>
            <p>The correct word was:</p>
            <h2>{gameStateObject.wordToGuess}</h2>
            <div className='reset-button-container'>
              <GameReset />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinScreen;
