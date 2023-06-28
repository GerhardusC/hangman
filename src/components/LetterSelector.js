//We use useSelector to get the game state and useDispatch to mark letters as guessed or not, to remove lives and to check whether the player wins.
import { useSelector, useDispatch } from 'react-redux'
import { removeLife, markGuessed, checkWin } from '../redux/slices/gameStateSlice';
//These are the two sounds that are made when the user clicks on a letter.
import pingSound from '../assets/audio/pingSound.wav'
import errorSound from '../assets/audio/errorSound.wav'

//This component returns a block full of buttons, one for each letter.
const LetterSelector = () => {
    //Get the game state
    const gameStateObject = useSelector((state) => state.gameState)
    const dispatch = useDispatch();
    //We can add the letters all to an array so we can map over them.
    const lettersArray = Object.keys(gameStateObject.letters);
    return (
        <div className={"letters"}>
            {/* Here we map over all the letters and give each a key, which we just make the letter itself, because all the letters are unique.
            We then assign classes to each letter based on whether they have been guessed correctly or not. */}
            {lettersArray.map((letter) => 
                <button 
                    key={letter} 
                    className={
                        gameStateObject.letters[letter].alreadyGuessed && gameStateObject.wordToGuess.toLowerCase().includes(letter) ? 'correct-letter-already-guessed' : gameStateObject.letters[letter].alreadyGuessed && !gameStateObject.wordToGuess.toLowerCase().includes(letter) ? 'incorrect-letter-already-guessed' : "letter-unguessed"
                    }
                    //Each letter has an onclick event which if the letter is not guessed it will be marked as guessed.
                    //If the letter is not included in the word to guess, we remove a life, otherwise we check for a win. 
                    //We only need to check for a win after a correct guess.
                    //Again if the sound is not muted, we play the relevant sound based on whether the guess is correct or not.
                    onClick={() => {
                        if(!gameStateObject.letters[letter].alreadyGuessed && !gameStateObject.gameOver){
                            dispatch(markGuessed(letter));
                            if(!gameStateObject.wordToGuess.toLowerCase().includes(letter)){
                                if(!gameStateObject.muted){
                                    new Audio(errorSound).play()
                                }
                                dispatch(removeLife())
                            } else {
                                if(!gameStateObject.muted){
                                    new Audio(pingSound).play()
                                }
                                dispatch(checkWin())
                            } 
                        }  
                    }}
                    >
                    {letter}
                </button>
            )}
        </div>
    )
}

export default LetterSelector;