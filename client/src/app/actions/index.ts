import {
	SET_PLAYER, SET_GAME,
	LOGOUT_PLAYER, UPDATE_SCORE,
	SET_PLAYER_ADMIN, ADD_ROW,
	PLAYER_LOST, RESET_STATES,
	BROADCAST_SCORE,
	UNSET_PLAYER_ADMIN
} from "../../reducers/player.reducer";
import { UPDATE_PLAYERS, CLEAR_OPPONENTS } from "../../reducers/opponent.reducer"
import { SET_ERROR, CLEAR_ERROR } from "../../reducers/error.reducer"

import {
	SHIFT_TETRO, MORE_TETROS,
	SET_GAME_MODE, SET_GAME_OVER,
	SET_GAME_STARTED, SET_IN_GAME,
	SET_WINNER, RESET_GAME,
	UPDATE_GAME_MODE,
	LEAVE_GAME,
	SET_GAME_TITLE
} from "../../reducers/game.reducer"

export {
	// Players actions
	SET_PLAYER, SET_GAME,
	LOGOUT_PLAYER,
	UPDATE_SCORE,
	SET_PLAYER_ADMIN,
	ADD_ROW, PLAYER_LOST,
	BROADCAST_SCORE,
	UNSET_PLAYER_ADMIN,
	RESET_STATES,

	// Opponents actions
	UPDATE_PLAYERS,
	CLEAR_OPPONENTS,
	// Error actions
	SET_ERROR, CLEAR_ERROR,

	// game actions
	SHIFT_TETRO, MORE_TETROS,
	SET_GAME_MODE, SET_GAME_OVER,
	SET_GAME_STARTED, SET_IN_GAME,
	SET_WINNER, RESET_GAME,
	UPDATE_GAME_MODE,
	LEAVE_GAME,
	SET_GAME_TITLE
}