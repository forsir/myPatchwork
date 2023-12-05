import { timeBoardData } from '../data/timeBoardData';
import { drag, dragEnd, dragStart, flip, init, place, rotateLeft, rotateRight, setPlayerSize, skip } from './actions';
import { Game, PatchData } from './types';

export const initial: Game = {
    gameData: {
        timeCellSize: 20,
        patchCellSize: 20,
        colors: {
            player1: '#889EAF',
            player2: '#BD74A0',
            timeStart: '#ff0000',
            timeNormal: '#ffc43a',
            timeButton: '#ffc43b',
            timePatch: '#8B4513',
            timeEnd: '#ff0000'
        }
    },
    patches: [],
    patchPositions: [],
    timeBoardData: timeBoardData.map((d) => ({ ...d })),
    dragged: null,
    smallPatch: false,
    player1: {
        blanketX: 0,
        blanketY: 0,
        blanketSize: 80,
        patches: [],
        positions: [],
        filled: getFilled(),
        buttons: 5,
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
        income: 0,
        time: 2
    },
    currentPlayerId: 'player1'
};

function getFilled(): number[][] {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export type Action =
    | { type: 'INIT_GAME'; payload: { x: number; y: number; a: number; b: number } }
    | { type: 'SET_PLAYER_SIZE'; payload: { id: 'player1' | 'player2'; x: number; y: number } }
    // | { type: 'MOVE_ITEM'; payload: { item: Item; point: Point } }
    | { type: 'DRAG_STARTED'; payload: { data: PatchData; position: { x: number; y: number } } }
    | { type: 'DRAG'; payload: { data: PatchData; position: { x: number; y: number } } }
    | { type: 'DRAG_ENDED'; payload: { data: PatchData; position: { x: number; y: number; angle: number } } }
    | { type: 'ROTATE_LEFT' }
    | { type: 'ROTATE_RIGHT' }
    | { type: 'FLIP' }
    | { type: 'SKIP' }
    | { type: 'PLACE' };

export const reducer = (state: Game, action: Action): Game => {
    switch (action.type) {
        case 'INIT_GAME': {
            const { x, y, a, b } = action.payload;
            return init(x, y, a, b, state);
        }

        case 'SET_PLAYER_SIZE': {
            const { id, x, y } = action.payload;
            return setPlayerSize(id, x, y, state);
        }

        case 'DRAG_STARTED': {
            const { data, position } = action.payload;
            return dragStart(data.id, position, state);
        }

        case 'DRAG': {
            const { data, position } = action.payload;
            return drag(data.id, position, state);
        }

        case 'DRAG_ENDED': {
            const { data, position } = action.payload;
            return dragEnd(data.id, position, state);
        }

        case 'ROTATE_LEFT': {
            return rotateLeft(state);
        }

        case 'ROTATE_RIGHT': {
            return rotateRight(state);
        }

        case 'FLIP': {
            return flip(state);
        }

        case 'PLACE': {
            return place(state);
        }

        case 'SKIP': {
            return skip(state);
        }

        default: {
            return state;
        }
    }
};
