import { PointData } from '../hooks/createEllipse';

export type Game = {
    patches: PatchData[];
    patchPositions: PointData[];
    dragged: null;
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

export type Patch = {
    id: string;
    name: string;
    x: number;
    y: number;
    height: number;
    width: number;
    path: string;
    rotated?: boolean;
    sawed?: boolean;
};

export type Board = {};

export type PlayerScore = {};

export type Point = { x: number; y: number };

export type Item = {};
