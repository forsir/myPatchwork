import { patchesData } from '../data/patchesData';
import { scoreBoardData } from '../data/scoreBoardData';
import { createEllipse } from '../hooks/createEllipse';
import { randomlyPatches } from '../hooks/randomlyPatches';
import { DraggedData, Game, PatchData, PlayerData } from './types';

export function init(x: number, y: number, a: number, b: number, state: Game): Game {
    const patches = randomlyPatches(patchesData);
    const positions = createEllipse(x, y, a, b, patches.length);
    const scoreBoardDataItems = [...scoreBoardData];
    return { ...state, patches: patches, patchPositions: positions, scoreBoardData: scoreBoardDataItems };
}

export function setSizes(id: 'player1' | 'player2', x: number, y: number, state: Game): Game {
    const player = { ...state[id], blanketX: x, blanketY: y } as PlayerData;
    return { ...state, [id]: player };
}

function removeElement(patches: PatchData[], id: string | undefined) {
    if (id === undefined) {
        return patches;
    }

    const index = patches.findIndex((f) => f.id === id);
    const newP1 = patches.slice(0, index);
    const newP2 = patches.slice(index + 1);
    return [...newP2, ...newP1];
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
            angle: 0,
            flipped: false
        }
    };
}

export function dragEnd(id: string, position: { x: number; y: number }, state: Game): Game {
    const newDragged = { ...state.dragged, x: position.x, y: position.y } as DraggedData;
    return {
        ...state,
        dragged: newDragged
    };
}

function rotate(matrix: number[][], direction: number) {
    // Make the rows to become cols (transpose)
    const newMatrix = matrix.map((_, index) => matrix.map((column) => column[index]));
    // Reverse each row to get a rotated matrix
    if (direction > 0) {
        return newMatrix.map((row) => row.reverse());
    }
    return newMatrix.reverse();
}

function flipMatrix(matrix: number[][]) {
    return matrix.map((row) => row.reverse());
}

export function rotateLeft(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const newDragged = {
        ...state.dragged,
        filled: rotate(state.dragged.filled, -1),
        angle: (state.dragged?.angle ?? 0) + Math.PI / 2
    } as DraggedData;
    return { ...state, dragged: newDragged };
}

export function rotateRight(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const newDragged = {
        ...state.dragged,
        filled: rotate(state.dragged.filled, 1),
        angle: (state.dragged?.angle ?? 0) - Math.PI / 2
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
    return { ...state, patches: removeElement(state.patches, state.dragged?.patch.id), dragged: null };
}
