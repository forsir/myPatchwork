import { timeBoardData } from '../data/timeBoardData';
import { Game } from './types';

function getFilled(): number[][] {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export const initial: Game = {
    gameData: {
        timeCellSize: 20,
        patchCellSize: 20,
        centerX: 100,
        centerY: 100,
        colors: {
            player1: '#889EAF',
            player2: '#BD74A0',
            timeStart: '#ff0000',
            timeNormal: '#ffc43a',
            timeButton: '#ffc43b',
            timePatch: '#8B4513',
            timePatchOut: '#dc9e2e',
            timeEnd: '#ff0000'
        }
    },
    patches: [],
    patchPositions: [],
    timeBoardData: timeBoardData.map((d) => ({ ...d })),
    dragged: null,
    smallPatches: 0,
    player1: {
        blanketX: 0,
        blanketY: 0,
        blanketSize: 80,
        patches: [],
        positions: [],
        filled: getFilled(),
        buttons: 5,
        buttonsAnimation: [],
        income: 0,
        time: 1
    },
    player2: {
        blanketX: 0,
        blanketY: 0,
        blanketSize: 80,
        patches: [],
        positions: [],
        filled: getFilled(),
        buttons: 5,
        buttonsAnimation: [],
        income: 0,
        time: 2
    },
    currentPlayerId: 'player1'
};
