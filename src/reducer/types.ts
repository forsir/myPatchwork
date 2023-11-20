import { PointData } from '../hooks/createEllipse';

export type Game = {
    patches: PatchData[];
    patchPositions: PointData[];
    scoreBoardData: ScoreBoardDataItem[];
    dragged: DraggedData | null;
    player1: PlayerData;
    player2: PlayerData;
    currentPlayerId: 'player1' | 'player2';
};

export type PatchData = {
    id: string;
    svg: string;
    viewBox: string;
    pattern: string;
    color: string;
    price: number;
    time: number;
    income: number;
    filled: number[][];
    rotated?: boolean;
    sawed?: boolean;
};

export type DraggedData = {
    patch: PatchData;
    x: number;
    y: number;
    angle: number;
    flipped: boolean;
    filled: number[][];
};

export type BorderPosition = 'b' | 't' | 'l' | 'r';

export type ScoreBoardDataItem = {
    id: number;
    x: number;
    y: number;
    w?: number;
    h?: number;
    button?: number;
    patch?: number;
    b?: BorderPosition[];
    color: string;
};

export type Board = {};

export type PlayerData = {
    blanketX?: number;
    blanketY?: number;
};

export type Point = { x: number; y: number };

export type Item = {};
