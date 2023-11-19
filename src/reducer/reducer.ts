import { PointData } from '../hooks/createEllipse';
import { dragEnd, init } from './actions';
import { Game, Item, PatchData, Point } from './types';

export const initial: Game = {
    patches: [],
    patchPositions: [],
    scoreBoardData: [],
    dragged: null
};

export type Action =
    | { type: 'INIT_GAME'; payload: { x: number; y: number; a: number; b: number } }
    | { type: 'ADD_ITEM'; payload: { item: Item } }
    | { type: 'MOVE_ITEM'; payload: { item: Item; point: Point } }
    | { type: 'DRAG_STARTED'; payload: { data: PatchData; position: PointData } }
    | { type: 'DRAG_MOVED'; payload: { item: Item; point: Point } }
    | { type: 'DRAG_ENDED'; payload: { data: PatchData; position: PointData } }
    | { type: 'ANIMATION_ENDED' };

export const reducer = (state: Game, action: Action): Game => {
    switch (action.type) {
        case 'INIT_GAME':
            const { x, y, a, b } = action.payload;
            return init(x, y, a, b, state);

        case 'ADD_ITEM': {
            const nextState = { ...state };
            const { item } = action.payload;

            console.log(item);

            // if (!nextState.items.some((i) => i.name === item.name)) {
            //     nextState.items.push(item);
            //     nextState.cells = setItemToCells(item, nextState.cells);
            // }

            return nextState;
        }
        case 'MOVE_ITEM': {
            const nextState = { ...state };
            const { item, point } = action.payload;

            // nextState.cells = clearItemFromCells(item, nextState.cells);

            // item.x = point.x;
            // item.y = point.y;

            // nextState.cells = setItemToCells(item, nextState.cells);

            return nextState;
        }
        case 'DRAG_STARTED': {
            const nextState = { ...state };
            const { data, position } = action.payload;
            // const { x, y } = item;

            // nextState.dragging = {
            //     id: item.id,
            //     initialPoint: { x, y },
            //     nextPoint: { x, y },
            //     path: item.path,
            //     valid: true
            // };

            return nextState;
        }
        case 'DRAG_MOVED': {
            const nextState = { ...state };
            const { item, point } = action.payload;

            // if (nextState.dragging) {
            //     nextState.dragging.nextPoint = point;

            //     // nextState.dragging.valid = itemWillFit(item, point, nextState.cells);
            // }

            return nextState;
        }
        case 'DRAG_ENDED': {
            const { data, position } = action.payload;
            return dragEnd(data.id, state);
        }
        case 'ANIMATION_ENDED': {
            return { ...state, dragged: null };
        }
        default: {
            return state;
        }
    }
};
