import { patchesData } from '../data/patchesData';
import { timeBoardData } from '../data/timeBoardData';
import { createEllipse } from '../hooks/createEllipse';
import { randomlyPatches } from '../hooks/randomlyPatches';
import { checkPatchPlace, movePlayer, setCurrentPlayer } from './stateActions';
import { Game, PlayerData } from './types';
import { flipMatrix, placeFill, removeElement, rotateMatrixLeft, rotateMatrixRight } from './utils';

export function init(x: number, y: number, a: number, b: number, state: Game): Game {
    const patches = randomlyPatches(patchesData);
    const positions = createEllipse(x, y, a, b, patches.length);
    const timeBoardDataItems = timeBoardData.map((d) => ({ ...d }));
    return { ...state, patches: patches, patchPositions: positions, timeBoardData: timeBoardDataItems };
}

export function setPlayerSize(id: 'player1' | 'player2', x: number, y: number, state: Game): Game {
    const player = {
        ...state[id],
        blanketX: Math.round(x),
        blanketY: Math.round(y),
        blanketSize: state.gameData.patchCellSize * 9
    } as PlayerData;

    // const positions = createEllipse(x, y, a, b, patchesData.length);

    const positions = state.patchPositions;
    return { ...state, [id]: player, patchPositions: positions };
}

export function dragStart(id: string, position: { x: number; y: number }, state: Game): Game {
    if (state.dragged?.patch.id === id) {
        return { ...state, overlaps: undefined };
    }

    const patch = state.patches.find((p) => p.id === id);
    if (!patch) {
        return state;
    }

    return {
        ...state,
        overlaps: undefined,
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

export function drag(id: string, position: { x: number; y: number }, state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    return {
        ...state,
        dragged: {
            ...state.dragged,
            x: position.x,
            y: position.y
        }
    };
}

export function dragEnd(id: string, position: { x: number; y: number; angle: number }, state: Game): Game {
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

    // const patch = state.dragged.patch;
    const x = state.dragged.x; // - (state.dragged.angle % 180 === 0 ? patch.width / 2 : patch.height / 2);
    const y = state.dragged.y; // - (state.dragged.angle % 180 === 0 ? patch.height / 2 : patch.width / 2);
    // const x = state.dragged.x - (state.dragged.angle % 180 === 0 ? patch.height / 2 : patch.width / 2);
    // const y = state.dragged.y - (state.dragged.angle % 180 === 0 ? patch.width / 2 : patch.height / 2);

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
        filled: flipMatrix(state.dragged.filled)
    });
}

export function place(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const cellSize = state.gameData.patchCellSize;
    const newPlayerData = { ...state[state.currentPlayerId] };

    newPlayerData.patches = [...newPlayerData.patches, state.dragged.patch];
    newPlayerData.positions = [
        ...newPlayerData.positions,
        {
            x: state.dragged.x - newPlayerData.blanketX,
            y: state.dragged.y - newPlayerData.blanketY,
            flipped: state.dragged.flipped,
            angle: state.dragged.angle
        }
    ];

    const posX = Math.round((state.dragged.x - newPlayerData.blanketX) / cellSize);
    const posY = Math.round((state.dragged.y - newPlayerData.blanketY) / cellSize);

    newPlayerData.filled = placeFill(newPlayerData.filled, state.dragged.filled, posX, posY);

    newPlayerData.buttons -= state.dragged.patch.price;
    newPlayerData.income += state.dragged.patch.income;

    const patchId = state.dragged.patch.id;
    const newPatches = removeElement(state.patches, patchId);

    let newState = {
        ...state,
        patches: newPatches,
        dragged: null,
        [state.currentPlayerId]: newPlayerData
    } as Game;

    newState = movePlayer(newState, state.dragged.patch.time, 0);

    newState = setCurrentPlayer(newState);

    return newState;
}

export function skip(state: Game): Game {
    const oppositePlayer = state.currentPlayerId === 'player1' ? state.player2 : state.player1;

    let newState = {
        ...state,
        dragged: null
    } as Game;

    newState = movePlayer(newState, 0, oppositePlayer.time);

    newState = setCurrentPlayer(newState);

    return newState;
}
