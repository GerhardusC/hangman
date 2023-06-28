//This component uses useDispatch to mute the audio and useSelector to show the user whether the audio is muted.
import { useDispatch, useSelector } from "react-redux";
//Framer-motion is used to make animations when the how to play box comes up and goes away.
import { motion, AnimatePresence } from "framer-motion";
//Getting muteAudio from the gameState slice.
import { muteAudio } from "../redux/slices/gameStateSlice";

//There will be a little bit of state in this part, this is just to control the display help. I just felt like there was no need to make this state global.
import { useState } from 'react'
import GameReset from "./GameReset";

//This component contains the buttons to access the how to play screen, the mute button, and the play again button.
//This component would probably be better named "InterfaceMenu" or something.
const HowToPlay = () => {
    //Getting the game state object from redux.
    const gameStateObject = useSelector((state) => state.gameState)
    const dispatch = useDispatch()
    //Adding state for the help display modal.
    const [helpDisplayState, setHelpDisplayState] = useState(false)
    return (
        <div>
            {/* This help buttons container contains the how to play button, the mute audio button and the reset game button. */}
            <div className="help-buttons-container">
                <button onClick={() => setHelpDisplayState(!helpDisplayState)}>How to play</button>
                <button onClick={() => dispatch(muteAudio())}>{gameStateObject.muted? "🔇": "🔊"}</button>
                <GameReset />
            </div>
            {/* The popup box is animated using the framer-motion library. We add the component in an AnmiatePresence component just so 
            the box animates out as well.*/}
            <AnimatePresence>
            {helpDisplayState && (
                <motion.div 
                    className="help-popup-background"
                    animate={{opacity: [0, 1]}}
                    transition={{duration: 0.3, ease: "easeInOut"}}
                    >
                    <motion.div className="help-popup-box"
                    animate={{scale: [0, 1.1, 1]}}
                    transition={{duration: 0.3, ease: "easeInOut"}}
                    exit={{scale: [1, 1.1, 0]}}>
                        <h1>How to play:</h1>
                        <p>A random word has been selected. The length of this word is represented by underscores right above the set of letters that you can interact with.</p>
                        <p>To play, click on the letters that you think make up your word.</p>
                        <p>If you click on a letter that is contained in the word, it will appear in the display above the letters at each instance that the letter can be found.</p>
                        <p>If the letter you clicked on is not in the word, part of the hang-man will start being drawn.</p>
                        <p>The hang-man is made of 10 lines, if all the lines are drawn, you lose.</p>
                        <p>Feel free to mute the sound with the mute button.</p>
                        <div className="hide-help-button-container">
                            <button className="hide-help-button" onClick={() => setHelpDisplayState(!helpDisplayState)}>OK</button>
                        </div>
                        
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )
}

export default HowToPlay;