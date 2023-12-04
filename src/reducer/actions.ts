import { patchesData } from '../data/patchesData';
import { timeBoardData } from '../data/timeBoardData';
import { createEllipse } from '../hooks/createEllipse';
import { randomlyPatches } from '../hooks/randomlyPatches';
import { DraggedData, Game, PlayerData } from './types';
import { flipMatrix, removeElement, rotateMatrixLeft, rotateMatrixRight } from './utils';

export function init(x: number, y: number, a: number, b: number, state: Game): Game {
    const patches = randomlyPatches(patchesData);
    const positions = createEllipse(x, y, a, b, patches.length);
    const timeBoardDataItems = timeBoardData.map((d) => ({ ...d }));
    return { ...state, patches: patches, patchPositions: positions, timeBoardData: timeBoardDataItems };
}

export function setSizes(id: 'player1' | 'player2', x: number, y: number, state: Game): Game {
    const player = { ...state[id], blanketX: Math.round(x), blanketY: Math.round(y) } as PlayerData;

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
            onBlanket: false
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

export function dragEnd(id: string, position: { x: number; y: number }, state: Game): Game {
    let x = Math.round(position.x);
    let y = Math.round(position.y);
    const player = state[state.currentPlayerId];

    let onBlanket = false;
    if (
        x > player.blanketX - 10 &&
        x < player.blanketX + 180 &&
        y > player.blanketY - 10 &&
        y < player.blanketY + 180
    ) {
        x = player.blanketX + Math.round((x - player.blanketX) / 20) * 20;
        y = player.blanketY + Math.round((y - player.blanketY) / 20) * 20;
        onBlanket = true;
    }

    x = Math.round(x);
    y = Math.round(y);

    const newDragged = {
        ...state.dragged,
        x,
        y,
        isDragging: false,
        onBlanket
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

export function place(state: Game): Game {
    if (!state.dragged) {
        return state;
    }

    const patchId = state.dragged?.patch.id;

    const playerData = { ...state[state.currentPlayerId] };

    playerData.patches = [...playerData.patches, state.dragged.patch];
    playerData.positions = [
        ...playerData.positions,
        {
            x: state.dragged.x - playerData.blanketX,
            y: state.dragged.y - playerData.blanketY,
            flipped: state.dragged.flipped,
            angle: state.dragged.angle
        }
    ];

    // console.log('place', state.dragged.x - playerData.blanketX, state.dragged.y - playerData.blanketY);

    playerData.buttons -= state.dragged.patch.price;
    playerData.time += state.dragged.patch.time;

    const player = state.currentPlayerId === 'player1' ? 'player2' : 'player1';

    const newPatches = removeElement(state.patches, patchId);

    return {
        ...state,
        patches: newPatches,
        dragged: null,
        [state.currentPlayerId]: playerData,
        currentPlayerId: player
    };
}
