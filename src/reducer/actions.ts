import { patchesData } from '../data/patchesData';
import { smallPatch } from '../data/smallPatchData';
import { timeBoardData } from '../data/timeBoardData';
import { createEllipse } from '../hooks/createEllipse';
import { randomlyPatches } from '../hooks/randomlyPatches';
import { initial } from './initial';
import { checkPatchPlace, checkWinner, movePlayer, setCurrentPlayer, stateCheck7x7, statePlace } from './stateActions';
import { Game, PlayerData, PlayerType } from './types';
import { flipMatrixHorizontal, flipMatrixVertical, rotateMatrixLeft, rotateMatrixRight } from './utils';

export function init(x: number, y: number, a: number, b: number, state: Game): Game {
    const patches = randomlyPatches(patchesData);
    const positions = createEllipse(x - state.gameData.patchCellSize * 1.5, y, a, b, patches.length);
    const timeBoardDataItems = timeBoardData.map((d) => ({ ...d }));

    return {
        ...state,
        gameData: {
            ...state.gameData,
            centerX: x,
            centerY: y
        },
        patches: patches,
        patchPositions: positions,
        timeBoardData: timeBoardDataItems
    };
}

export function newGame(state: Game): Game {
    const player1Data = {
        ...initial.player1,
        blanketX: state.player1.blanketX,
        blanketY: state.player1.blanketY,
        blanketSize: state.gameData.patchCellSize * 9
    } as PlayerData;

    const player2Data = {
        ...initial.player2,
        blanketX: state.player2.blanketX,
        blanketY: state.player2.blanketY,
        blanketSize: state.gameData.patchCellSize * 9
    } as PlayerData;

    return {
        ...state,
        currentPlayerId: 'player1',
        dragged: null,
        patches: randomlyPatches(patchesData),
        player1: player1Data,
        player2: player2Data,
        smallPatches: 0,
        timeBoardData: timeBoardData.map((d) => ({ ...d })),
        winner: null
    };
}

export function setPlayerSize(
    id: PlayerType,
    x: number,
    y: number,
    windowWidth: number,
    windowHeight: number,
    state: Game
): Game {
    const playerData = {
        ...state[id],
        blanketX: Math.round(x),
        blanketY: Math.round(y),
        blanketSize: state.gameData.patchCellSize * 9
    } as PlayerData;

    const centerX = windowWidth / 2;
    const centerY = windowHeight / 4;
    const a = windowWidth / 2.5;
    const b = windowHeight / 4;
    const positions = createEllipse(centerX - state.gameData.patchCellSize * 1.5, centerY, a, b, patchesData.length);

    return {
        ...state,
        gameData: {
            ...state.gameData,
            centerX: centerX,
            centerY: centerY
        },
        [id]: playerData,
        patchPositions: positions
    };
}

export function dragStart(id: string, position: { x: number; y: number }, state: Game): Game {
    if (state.dragged?.patch.id === id) {
        return { ...state, overlaps: null };
    }

    let patch = state.patches.find((p) => p.id === id);
    if (!patch) {
        if (state.smallPatches > 0) {
            patch = smallPatch;
        } else {
            return state;
        }
    }

    return {
        ...state,
        overlaps: null,
        dragged: {
            patch,
            filled: patch.filled,
            x: position.x,
            y: position.y,
            isDragging: true,
            angle: 0,
            flipped: false,
            onBlanket: false,
            canBePlaced: true
        }
    };
}

export function dragEnd(id: string, position: { x: number; y: number; angle: number }, state: Game): Game {
    if (state.dragged?.patch.id !== id) {
        return state;
    }

    return checkPatchPlace(state, position);
}

export function rotateLeft(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const x = state.dragged.x;
    const y = state.dragged.y;

    return checkPatchPlace(state, {
        x: x,
        y: y,
        angle: state.dragged.angle + 90,
        filled: rotateMatrixLeft(state.dragged.filled)
    });
}

export function rotateRight(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const x = state.dragged.x;
    const y = state.dragged.y;

    return checkPatchPlace(state, {
        x: x,
        y: y,
        angle: state.dragged.angle - 90,
        flipped: state.dragged.flipped ?? false,
        filled: rotateMatrixRight(state.dragged.filled)
    });
}

export function flip(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    return checkPatchPlace(state, {
        x: state.dragged.x,
        y: state.dragged.y,
        angle: state.dragged.angle,
        flipped: !state.dragged.flipped,
        filled:
            state.dragged.angle % 180 === 0
                ? flipMatrixHorizontal(state.dragged.filled)
                : flipMatrixVertical(state.dragged.filled)
    });
}

export function place(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    let newState = statePlace(state);

    newState = stateCheck7x7(newState);

    newState = movePlayer(newState, state.dragged.patch.time, 0);

    newState = setCurrentPlayer(newState);

    newState = checkWinner(newState);

    return newState;
}

export function skip(state: Game): Game {
    const oppositePlayer = state.currentPlayerId === 'player1' ? state.player2 : state.player1;

    let newState = {
        ...state,
        dragged: null,
        overlaps: null
    } as Game;

    newState = movePlayer(newState, 0, oppositePlayer.time);

    newState = setCurrentPlayer(newState);

    newState = checkWinner(newState);

    return newState;
}

export function animationEnd(state: Game, player: PlayerType, value: number): Game {
    const newButtonAnimation = [...(state[player].buttonsAnimation ?? [])];
    const index = newButtonAnimation.indexOf(value);
    newButtonAnimation.splice(index, 1);

    return {
        ...state,
        [player]: {
            ...state[player],
            buttonsAnimation: newButtonAnimation
        } as PlayerData
    };
}
