//useDispatch is used to reset the game state, and useSelector is used 
import { useDispatch, useSelector } from 'react-redux'
//resetGameState is imported from the gameState slice.
import { resetGameState } from '../redux/slices/gameStateSlice';
import resetSound from '../assets/audio/resetSound.ogg'

//This component is a simple button that resets the game state. It dispatches the reset game state reducer.
//It also uses the gameStateObject to see if the game sound is muted or not
//When the button is clicked and the game is not muted, it resets the game an plays the sound, otherwise it just resets the game.
const GameReset = () => {
    const gameStateObject = useSelector((state) => state.gameState)
    const dispatch = useDispatch();
    return (
        <button
            className='reset-button' 
            onClick={() => {
                if(!gameStateObject.muted){
                    new Audio(resetSound).play()
                }
                dispatch(resetGameState());
            }
        }>Play again
        </button>
    )
}

export default GameReset;