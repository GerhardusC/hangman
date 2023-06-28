//This file just initiates the redux store.
import { configureStore } from '@reduxjs/toolkit';
import gameStateSlice from './slices/gameStateSlice';

export const store = configureStore({
    reducer: {
        gameState: gameStateSlice
    },
})