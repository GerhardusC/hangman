//Bringing in all the images from the assets folder.
import imgState1 from '../assets/drawings/state1.GIF'
import imgState2 from '../assets/drawings/state2.GIF'
import imgState3 from '../assets/drawings/state3.GIF'
import imgState4 from '../assets/drawings/state4.GIF'
import imgState5 from '../assets/drawings/state5.GIF'
import imgState6 from '../assets/drawings/state6.GIF'
import imgState7 from '../assets/drawings/state7.GIF'
import imgState8 from '../assets/drawings/state8.GIF'
import imgState9 from '../assets/drawings/state8.GIF'
import imgState10 from '../assets/drawings/state10.gif'
import imgState11 from '../assets/drawings/state11.GIF'
//The useSelector will be used to get the lives of the user.
import { useSelector } from 'react-redux'
//Putting the images all in an array so we can access them by index.
const imageUrls = [ 
    imgState1, imgState2, imgState3, 
    imgState4, imgState5, imgState6, 
    imgState7, imgState8, imgState9, 
    imgState10, imgState11
]
//The HangingMan component uses the lives left from the game state to show the appropriate hangman diagram.
const HangingMan = () => {
    const gameStateObject = useSelector((state) => state.gameState)
    return(
        <div className='lives-display'>
            {/* When the number of lives left is 10, we use image 1 at index 0 and when the number of lives is 0 we use image 11 at index 10. */}
            <img alt='A hanging man.' src={imageUrls[10 - gameStateObject.lives]} />
        </div>
    )
}

export default HangingMan;
