import { Game, PlayerData } from './types';
import { getNextPlayer } from './utils';

export function setCurrentPlayer(state: Game): Game {
    const newPlayer = getNextPlayer(state.currentPlayerId, state.player1.time, state.player2.time);
    return {
        ...state,
        currentPlayerId: newPlayer
    };
}

export function movePlayer(state: Game, incomeTime: number): Game {
    const currentPlayer = state[state.currentPlayerId];
    let newSmallPatch = false;
    let newTime = currentPlayer.time;
    let newTimeBoardData = null;
    let newButtons = currentPlayer.buttons;

    if (newTime < 2) {
        newTime = 2;
        incomeTime--;
    }

    for (let i = 0; i < incomeTime; i++) {
        newTime++;
        if (state.timeBoardData[newTime].patch) {
            newSmallPatch = true;
            newTimeBoardData = newTimeBoardData ?? [...state.timeBoardData];
            newTimeBoardData[newTime] = { ...newTimeBoardData[newTime], patch: false };
            newTime++;
        } else if (state.timeBoardData[newTime].patch == false) {
            newTime++;
        }
        if (state.timeBoardData[newTime].buttons) {
            newButtons += currentPlayer.income;
            newTimeBoardData = newTimeBoardData ?? [...state.timeBoardData];
            newTimeBoardData[newTime] = {
                ...newTimeBoardData[newTime],
                buttons: newTimeBoardData[newTime].buttons! - 1
            };
        }
    }
    return {
        ...state,
        smallPatch: newSmallPatch,
        timeBoardData: newTimeBoardData ?? state.timeBoardData,
        [state.currentPlayerId]: {
            ...currentPlayer,
            time: newTime,
            buttons: newButtons
        } as PlayerData
    };
}
