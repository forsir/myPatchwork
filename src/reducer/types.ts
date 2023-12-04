export type Game = {
    gameData: GameData;
    patches: PatchData[];
    patchPositions: PointData[];
    scoreBoardData: ScoreBoardDataItem[];
    dragged: DraggedData | null;
    player1: PlayerData;
    player2: PlayerData;
    currentPlayerId: 'player1' | 'player2';
};

export type GameData = {};

export type PatchData = {
    id: string;
    svg: string;
    width: number;
    height: number;
    pattern: string;
    color: string;
    price: number;
    time: number;
    income: number;
    filled: number[][];
};

export type DraggedData = {
    patch: PatchData;
    x: number;
    y: number;
    angle: number;
    flipped: boolean;
    isDragging: boolean;
    onBlanket: boolean;
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

export type PlayerData = {
    blanketX: number;
    blanketY: number;
    filled: number[][];
    patches: PatchData[];
    positions: PointData[];
    buttons: number;
    time: number;
};

export type PointData = {
    x: number;
    y: number;
    angle: number;
    flipped?: boolean;
    isDragging?: boolean;
    filled?: number[][];
    onBlanket?: boolean;
};
