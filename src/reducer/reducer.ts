import {
    animationEnd,
    drag,
    dragEnd,
    dragStart,
    flip,
    init,
    newGame,
    place,
    rotateLeft,
    rotateRight,
    setPlayerSize,
    skip
} from './actions';
import { Game, PatchData, PlayerType } from './types';

export type Action =
    | { type: 'INIT_GAME'; payload: { x: number; y: number; a: number; b: number } }
    | { type: 'NEW_GAME' }
    | {
          type: 'SET_PLAYER_SIZE';
          payload: { id: PlayerType; x: number; y: number; windowWidth: number; windowHeight: number };
      }
    // | { type: 'MOVE_ITEM'; payload: { item: Item; point: Point } }
    | { type: 'DRAG_STARTED'; payload: { data: PatchData; position: { x: number; y: number } } }
    | { type: 'DRAG'; payload: { data: PatchData; position: { x: number; y: number } } }
    | { type: 'DRAG_ENDED'; payload: { data: PatchData; position: { x: number; y: number; angle: number } } }
    | { type: 'ROTATE_LEFT' }
    | { type: 'ROTATE_RIGHT' }
    | { type: 'FLIP' }
    | { type: 'SKIP' }
    | { type: 'PLACE' }
    | { type: 'ANIMATION_END'; payload: { player: PlayerType; index: number } };

export const reducer = (state: Game, action: Action): Game => {
    switch (action.type) {
        case 'INIT_GAME': {
            const { x, y, a, b } = action.payload;
            return init(x, y, a, b, state);
        }

        case 'NEW_GAME': {
            return newGame(state);
        }

        case 'SET_PLAYER_SIZE': {
            const { id, x, y, windowWidth, windowHeight } = action.payload;
            return setPlayerSize(id, x, y, windowWidth, windowHeight, state);
        }

        case 'DRAG_STARTED': {
            const { data, position } = action.payload;
            return dragStart(data.id, position, state);
        }

        case 'DRAG': {
            const { data, position } = action.payload;
            return drag(position, state);
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

        case 'ANIMATION_END': {
            const { player, index } = action.payload;
            return animationEnd(state, player, index);
        }

        default: {
            return state;
        }
    }
};
