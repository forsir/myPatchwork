import { dragEnd, dragStart, flip, init, place, rotateLeft, rotateRight } from './actions';
import { Game, PatchData } from './types';

export const initial: Game = {
    patches: [],
    patchPositions: [],
    scoreBoardData: [],
    dragged: null,
    player1: {},
    player2: {}
};

export type Action =
    | { type: 'INIT_GAME'; payload: { x: number; y: number; a: number; b: number } }
    // | { type: 'MOVE_ITEM'; payload: { item: Item; point: Point } }
    | { type: 'DRAG_STARTED'; payload: { data: PatchData; position: { x: number; y: number } } }
    | { type: 'DRAG_ENDED'; payload: { data: PatchData; position: { x: number; y: number } } }
    | { type: 'ROTATE_LEFT' }
    | { type: 'ROTATE_RIGHT' }
    | { type: 'FLIP' }
    | { type: 'PLACE' };

export const reducer = (state: Game, action: Action): Game => {
    switch (action.type) {
        case 'INIT_GAME': {
            const { x, y, a, b } = action.payload;
            return init(x, y, a, b, state);
        }

        case 'DRAG_STARTED': {
            const { data, position } = action.payload;
            return dragStart(data.id, position, state);
        }

        case 'DRAG_ENDED': {
            const { data, position } = action.payload;
            return dragEnd(data.id, state);
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

        default: {
            return state;
        }
    }
};
