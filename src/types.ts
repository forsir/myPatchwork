export interface Item {
    id: string;
    name: string;
    x: number;
    y: number;
    height: number;
    width: number;
}

export type Cells = string[][];

export type Inventory = {
    items: Item[];
    cells: string[][];
    dragging?: {
        id: string;
        initialPoint: Point;
        nextPoint: Point;
        valid: boolean;
    };
};

export type Point = { x: number; y: number };
