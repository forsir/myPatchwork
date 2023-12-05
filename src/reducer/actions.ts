import { patchesData } from '../data/patchesData';
import { timeBoardData } from '../data/timeBoardData';
import { createEllipse } from '../hooks/createEllipse';
import { randomlyPatches } from '../hooks/randomlyPatches';
import { DraggedData, Game, PlayerData } from './types';
import {
    checkFill,
    flipMatrix,
    patchSize,
    placeFill,
    removeElement,
    rotateMatrixLeft,
    rotateMatrixRight
} from './utils';

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
        return state;
    }

    const patch = state.patches.find((p) => p.id === id);
    if (!patch) {
        return state;
    }

    return {
        ...state,
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
    if (!state.dragged) {
        return state;
    }
    let x = Math.round(position.x);
    let y = Math.round(position.y);
    const cellSize = state.gameData.patchCellSize;
    const cellSizeHalf = cellSize / 2;
    const patch = state.patches.find((p) => p.id === id)!;
    const patchWidth = patchSize(position.angle % 180 === 0 ? patch.width : patch.height, cellSize);
    const patchHeight = patchSize(position.angle % 180 === 0 ? patch.height : patch.width, cellSize);
    const player = state[state.currentPlayerId];

    let onBlanket = false;
    let canBePlaced = true;
    if (
        x > player.blanketX - cellSizeHalf &&
        x < player.blanketX + player.blanketSize + cellSizeHalf - patchWidth &&
        y > player.blanketY - cellSizeHalf &&
        y < player.blanketY + player.blanketSize + cellSizeHalf - patchHeight
    ) {
        x = player.blanketX + Math.round((x - player.blanketX) / cellSize) * cellSize;
        y = player.blanketY + Math.round((y - player.blanketY) / cellSize) * cellSize;
        onBlanket = true;

        const posX = Math.round((x - player.blanketX) / cellSize);
        const posY = Math.round((y - player.blanketY) / cellSize);
        canBePlaced = checkFill(player.filled, state.dragged.filled, posX, posY);
    }

    x = Math.round(x);
    y = Math.round(y);

    const newDragged = {
        ...state.dragged,
        x,
        y,
        isDragging: false,
        onBlanket,
        canBePlaced
    } as DraggedData;

    return {
        ...state,
        dragged: newDragged
    };
}

export function rotateLeft(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const newDragged = {
        ...state.dragged,
        filled: rotateMatrixLeft(state.dragged.filled),
        angle: (state.dragged?.angle ?? 0) + 90
    } as DraggedData;
    return { ...state, dragged: newDragged };
}

export function rotateRight(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const newDragged = {
        ...state.dragged,
        filled: rotateMatrixRight(state.dragged.filled),
        angle: (state.dragged?.angle ?? 0) - 90
    } as DraggedData;
    return { ...state, dragged: newDragged };
}

export function flip(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const newDragged = {
        ...state.dragged,
        filled: flipMatrix(state.dragged.filled),
        flipped: !state.dragged?.flipped
    } as DraggedData;
    return { ...state, dragged: newDragged };
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
    newPlayerData.time += state.dragged.patch.time;
    newPlayerData.income += state.dragged.patch.income;

    const newPlayer = state.currentPlayerId === 'player1' ? 'player2' : 'player1';

    const patchId = state.dragged.patch.id;
    const newPatches = removeElement(state.patches, patchId);

    return {
        ...state,
        patches: newPatches,
        dragged: null,
        [state.currentPlayerId]: newPlayerData,
        currentPlayerId: newPlayer
    };
}

export function skip(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const newDragged = {
        ...state.dragged,
        filled: flipMatrix(state.dragged.filled),
        flipped: !state.dragged?.flipped
    } as DraggedData;
    return { ...state, dragged: newDragged };
}
