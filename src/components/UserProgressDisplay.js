//We use the useSelector just to get the gameState.
import { useSelector } from "react-redux";

//This component simply displays the player's word completion state.
const UserProgressDisplay = () => {
    const gameStateObject = useSelector((state) => state.gameState)
    return (
        <div>
            <div className="current-user-guess">{gameStateObject.wordCompletionState}</div>
        </div>
    )
}
export default UserProgressDisplay;