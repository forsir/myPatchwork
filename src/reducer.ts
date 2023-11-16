import { Cells, Inventory, Item, Point } from './types';

export const initial: Inventory = {
    items: [],
    cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((y) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((x) => 'none')),
    dragging: undefined
};

export type Action =
    | { type: 'ADD_ITEM'; payload: { item: Item } }
    | { type: 'MOVE_ITEM'; payload: { item: Item; point: Point } }
    | { type: 'DRAG_STARTED'; payload: { item: Item } }
    | { type: 'DRAG_MOVED'; payload: { item: Item; point: Point } }
    | { type: 'DRAG_ENDED'; payload: { item: Item } }
    | { type: 'ANIMATION_ENDED' };

export const reducer = (state: Inventory, action: Action): Inventory => {
    function clearItemFromCells(item: Item, cells: Cells) {
        const next = [...cells];

        for (let y = 0; y < item.height; y++) {
            for (let x = 0; x < item.width; x++) {
                next[y + item.y][x + item.x] = 'none';
            }
        }
        return next;
    }

    function setItemToCells(item: Item, cells: Cells) {
        const next = [...cells];

        for (let y = 0; y < item.height; y++) {
            for (let x = 0; x < item.width; x++) {
                next[y + item.y][x + item.x] = item.id;
            }
        }
        return next;
    }

    function itemWillFit(item: Item, point: Point, cells: Cells) {
        for (let y = 0; y < item.height; y++) {
            for (let x = 0; x < item.width; x++) {
                const cell = cells[y + point.y][x + point.x];
                if (cell !== 'none' && cell !== item.id) {
                    return false;
                }
            }
        }

        return true;
    }

    switch (action.type) {
        case 'ADD_ITEM': {
            const nextState = { ...state };
            const { item } = action.payload;

            console.log(item);

            if (!nextState.items.some((i) => i.name === item.name)) {
                nextState.items.push(item);
                nextState.cells = setItemToCells(item, nextState.cells);
            }

            return nextState;
        }
        case 'MOVE_ITEM': {
            const nextState = { ...state };
            const { item, point } = action.payload;

            nextState.cells = clearItemFromCells(item, nextState.cells);

            item.x = point.x;
            item.y = point.y;

            nextState.cells = setItemToCells(item, nextState.cells);

            return nextState;
        }
        case 'DRAG_STARTED': {
            const nextState = { ...state };
            const { item } = action.payload;
            const { x, y } = item;

            nextState.dragging = {
                id: item.id,
                initialPoint: { x, y },
                nextPoint: { x, y },
                path: item.path,
                valid: true
            };

            return nextState;
        }
        case 'DRAG_MOVED': {
            const nextState = { ...state };
            const { item, point } = action.payload;

            if (nextState.dragging) {
                nextState.dragging.nextPoint = point;

                nextState.dragging.valid = itemWillFit(item, point, nextState.cells);
            }

            return nextState;
        }
        case 'DRAG_ENDED': {
            const nextState = { ...state };
            const { item } = action.payload;

            if (nextState.dragging) {
                const { valid, initialPoint, nextPoint } = nextState.dragging;
                const point = valid ? nextPoint : initialPoint;

                nextState.cells = clearItemFromCells(item, nextState.cells);

                item.x = point.x;
                item.y = point.y;

                nextState.cells = setItemToCells(item, nextState.cells);

                const index = nextState.items.findIndex((i) => i.id === item.id);
                nextState.items[index] = item;

                return nextState;
            }

            return nextState;
        }
        case 'ANIMATION_ENDED': {
            return { ...state, dragging: undefined };
        }
        default: {
            return state;
        }
    }
};
