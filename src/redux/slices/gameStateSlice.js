import { createSlice } from '@reduxjs/toolkit';
//We get the dictionary from the assets folder.
import { dictionary } from '../../assets/dictionary/dictionary';
//This function initiates an object with keys for all the letters in the alphabet, 
//which contains a boolean property displaying whether the letter has been guessed.
const initiateLetters = () => {
    const lettersObject = {};
    for(let i = 97; i < (97 + 26); i++) {
        lettersObject[String.fromCharCode(i)] = {alreadyGuessed: false};
    }
    //I noticed that some of the words in the bank contains a hyphen, so I added the hyphen to the object.
    lettersObject['-'] = {alreadyGuessed: false};
    return lettersObject;
}
//The initial word is a random word from the dictionary we imported.
let initialWord = dictionary[Math.round(Math.random()*dictionary.length)]

//Initially we want the user to see underscores for each missing letter, 
//so we set the initial state of the word completion to all underscores for the length of the word.
let initialWordCompletionState = ""
for(let i = 0; i < initialWord.length; i++) {
    initialWordCompletionState += "_"
}
//This is the initial game state.
const initialState = {
    muted: false,
    lives: 10,
    gameOver: false,
    gameWon: false,
    currentGuesses: "",
    wordToGuess: initialWord,
    wordCompletionState: initialWordCompletionState,
    letters: initiateLetters()
}
//This is the slice containing the initial state and the reducers for our game state.
export const gameStateSlice = createSlice({
    name: 'gameStateSlice',
    initialState: initialState,
    reducers: {
        //This reducer removes a life from the user, and if all the lives are depleted game-over is set to true.
        removeLife: (state) => {
            state.lives -= 1;
            if(state.lives === 0){
                state.gameOver = true; 
            }
        },
        //This reducer resets the entire game state to the initial state above, except the muted property remains unchanged.
        resetGameState: (state) => {
            state.wordToGuess = dictionary[Math.round(Math.random()*dictionary.length)]
            state.lives = 10;
            state.gameWon = false;
            state.gameOver = false;
            state.currentGuesses = "";
            state.wordCompletionState = "";
            for(let i = 0; i < state.wordToGuess.length; i++){
                state.wordCompletionState += "_";
            }
            for(let i = 97; i < (97 + 26); i++){
                state.letters[String.fromCharCode(i)].alreadyGuessed = false;
            }
            state.letters['-'].alreadyGuessed = false;
        },
        //This reducer takes in a single letter and marks it as guessed. It also adds the letter to a string that keeps track of all the guesses.
        markGuessed: (state, action) => {
            state.letters[action.payload].alreadyGuessed = true;
            state.currentGuesses += action.payload
        },
        //This reducer checks whether the game is won.
        checkWin: (state) => {
            state.wordCompletionState = "";
            //We loop over the word that needs to be guessed, and comare our string of guessed letters. 
            //If the guessed letters includes the letter, we return the letter, otherwise we return an underscore representing a missing letter.
            for(let i = 0; i < state.wordToGuess.length; i++){
                if (state.currentGuesses.includes(state.wordToGuess[i].toLowerCase())){
                    state.wordCompletionState += state.wordToGuess[i]
                } else {
                    state.wordCompletionState += "_"
                }
            }
            //If the word-completion-state is the same as the word-to-guess, it means the user won and we respond accordingly.
            if(state.wordCompletionState === state.wordToGuess){
                state.gameWon = true;
                state.gameOver = true;
            }       
        },
        //This reducer allows you to mute the audio of the game.
        muteAudio: (state) => {
            state.muted = !state.muted;
        }
    }
})

export const { removeLife, resetGameState, markGuessed, checkWin, muteAudio } = gameStateSlice.actions

export default gameStateSlice.reducer;