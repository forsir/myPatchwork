import {
    dragEnd,
    dragStart,
    flip,
    initGame,
    newGame,
    placePatch,
    rotateLeft,
    rotateRight,
    scoreAnimationEnd,
    setPlayerSize,
    skipMove
} from './actions';
import { Game, PatchData, PlayerType } from './types';

export type Action =
    | { type: 'INIT_GAME'; payload: { x: number; y: number; a: number; b: number } }
    | { type: 'NEW_GAME' }
    | {
          type: 'SET_PLAYER_SIZE';
          payload: { playerId: PlayerType; x: number; y: number; windowWidth: number; windowHeight: number };
      }
    | { type: 'DRAG_STARTED'; payload: { data: PatchData; position: { x: number; y: number } } }
    | { type: 'DRAG_ENDED'; payload: { data: PatchData; position: { x: number; y: number; angle: number } } }
    | { type: 'ROTATE_LEFT' }
    | { type: 'ROTATE_RIGHT' }
    | { type: 'FLIP_PATCH' }
    | { type: 'SKIP_MOVE' }
    | { type: 'PLACE_PATCH' }
    | { type: 'SCORE_ANIMATION_END'; payload: { player: PlayerType; value: number } };

export const reducer = (state: Game, action: Action): Game => {
    switch (action.type) {
        case 'INIT_GAME': {
            const { x, y, a, b } = action.payload;
            return initGame(x, y, a, b, state);
        }

        case 'NEW_GAME': {
            return newGame(state);
        }

        case 'SET_PLAYER_SIZE': {
            const { playerId, x, y, windowWidth, windowHeight } = action.payload;
            return setPlayerSize(playerId, x, y, windowWidth, windowHeight, state);
        }

        case 'DRAG_STARTED': {
            const { data, position } = action.payload;
            return dragStart(data.id, position, state);
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

        case 'FLIP_PATCH': {
            return flip(state);
        }

        case 'PLACE_PATCH': {
            return placePatch(state);
        }

        case 'SKIP_MOVE': {
            return skipMove(state);
        }

        case 'SCORE_ANIMATION_END': {
            const { player, value } = action.payload;
            return scoreAnimationEnd(state, player, value);
        }

        default: {
            return state;
        }
    }
};
