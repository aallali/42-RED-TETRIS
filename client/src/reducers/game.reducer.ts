import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { socket } from '../app/hooks';
import { RootState } from '../app/store';
import { TETROMINOS } from "../helpers/tetrominos"
import { IGame, TypeGameMode } from '../types';
const initialState: IGame = {
	title: "",
	started: false,
	inGame: false,
	winner: undefined,
	tetros: [],
	mode: "multiplayer",
	gameOver: false,
	size: 5
};

export const gameSlice = createSlice({
	name: 'Game',
	initialState,
	reducers: {
		SET_GAME_STARTED(state) {
			state.tetros = []
			state.started = true
			state.gameOver = false
			state.winner = undefined
		},
		SET_GAME_TITLE(state, action: PayloadAction<string>) {
			state.title = action.payload
			state.inGame = true
		},
		SET_IN_GAME(state) {
			state.inGame = true
		},
		SET_GAME_OVER(state) {
			state.started = false
			state.gameOver = true
		},
		SET_WINNER(state, action: PayloadAction<string>) {
			state.winner = action.payload
		},
		SET_GAME_MODE(state, action: PayloadAction<TypeGameMode>) {
			state.mode = action.payload
		},
		RESET_GAME(state) {
			state.started = false
			state.inGame = false
			state.winner = undefined
			state.tetros = []
			state.mode = "multiplayer"
			state.gameOver = false
		},
		LEAVE_GAME(state) {
			state.title = ""
			state.started = false
			state.inGame = false
			state.winner = undefined
			state.tetros = []
			state.mode = "multiplayer"
			state.gameOver = false
			state.size = 5
		},
		SHIFT_TETRO: (state) => {
			state.tetros.shift()
		},
		MORE_TETROS(state, action: PayloadAction<(keyof typeof TETROMINOS)[]>) {
			state.tetros = [...state.tetros, ...action.payload]
		},
		UPDATE_GAME_MODE(state, action: PayloadAction<TypeGameMode>) {
			state.mode = action.payload
			if (state.inGame) {
				socket.emit("UPDATE_GAME_MODE", state.mode)
			}
		},
		UPDATE_ROOM_SIZE(state, action: PayloadAction<number>) {
			state.size = action.payload
			socket.emit("UPDATE_ROOM_SIZE", action.payload)
		},

	}
});

export const {
	SHIFT_TETRO, MORE_TETROS,
	SET_GAME_MODE, SET_GAME_OVER,
	SET_GAME_STARTED, SET_IN_GAME,
	SET_WINNER, RESET_GAME,
	UPDATE_GAME_MODE,
	LEAVE_GAME, UPDATE_ROOM_SIZE,
	SET_GAME_TITLE
} = gameSlice.actions;
export const isGameStarted = (state: RootState) => state.game.started;
export const isGameOver = (state: RootState) => state.game.gameOver
export const getGameMode = (state: RootState) => state.game.mode
export const getGameTitle = (state: RootState) => state.game.title
export const getTetros = (state: RootState) => state.game.tetros


export default gameSlice.reducer;
