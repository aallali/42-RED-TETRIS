/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
// constants
import { createStage } from '../../helpers/gameHelpers';
import { TETROMINOS } from '../../helpers/tetrominos';
// Hooks
import type { PLAYER } from './usePlayer';
// Types
export type STAGECELL = [string | number, string];
export type STAGE = STAGECELL[][];

export const useStage = (player: PLAYER, resetPlayer: (a: keyof typeof TETROMINOS) => void, tetro: keyof typeof TETROMINOS) => {
	const [stage, setStage] = useState(createStage());
	const [rowsCleared, setRowsCleared] = useState(0);
	useEffect(() => {
		if (!player.pos) return;

		setRowsCleared(0);

		const sweepRows = (newStage: STAGE): STAGE => {
			let rowsCl = 0
			const nstageCleared = newStage.reduce((ack, row) => {
				// If we don't find a 0 it means that the row is full and should be cleared
				if (row.findIndex(cell => cell[0] === 0 || cell[0] === "X") === -1) {
					// setRowsCleared(prev => prev + 1); // this increase multipel time : FIXED by mocing counter outside reducer 
					rowsCl++
					// Create an empty row at the beginning of the array to push the Tetrominos down
					// instead of returning the cleared row
					ack.unshift(new Array(newStage[0].length).fill([0, 'clear']) as STAGECELL[]);
					return ack;
				}

				ack.push(row);
				return ack;
			}, [] as STAGE);
			setRowsCleared(rowsCl);
			return nstageCleared
		};
		const updateStage = (prevStage: STAGE): STAGE => {
			// First flush the stage
			// If it says "clear" but don't have a 0 it means that it's the players move and should be cleared
			const newStage = prevStage.map(
				row => row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)) as STAGECELL[]
			);
			// Then draw the tetromino
			try {
				player.tetromino.forEach((row, y) => {
					row.forEach((value, x) => {
						if (value !== 0) {
							try {
								newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? 'merged' : 'clear'}`];

							} catch (error) {
								console.log(error)
								console.log(`Throwed at Y : ${y} X: ${x} Player pos X ${player.pos.x} Player pos y ${player.pos.y}`)
								console.log(player.pos)
							}	
						}
					});
				});
			} catch (error) {
				console.log(player.pos)
				throw error
			}
			if (player.collided) {
				resetPlayer(tetro);
				return sweepRows(newStage);
			}
			return newStage;
		};
		setStage(prev => updateStage(prev));
	}, [player.collided, player.pos?.x, player.pos?.y, player.tetromino, tetro]);

	return { stage, setStage, rowsCleared };
};
