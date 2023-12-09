export type Game = {
    gameData: GameData;
    patches: PatchData[];
    overlaps?: { x: number; y: number; data: number[][] };
    patchPositions: PointData[];
    timeBoardData: TimeBoardDataItem[];
    dragged: DraggedData | null;
    player1: PlayerData;
    player2: PlayerData;
    isSquare7x7Free: boolean;
    smallPatches: number;
    currentPlayerId: PlayerType;
    winner?: PlayerType | 'both';
};

export type PlayerType = 'player1' | 'player2';

export type Colors = {
    player1: string;
    player2: string;
    timeStart: string;
    timeNormal: string;
    timeButton: string;
    timePatch: string;
    timePatchOut: string;
    timeEnd: string;
};

export type GameData = {
    patchCellSize: number;
    timeCellSize: number;
    colors: Colors;
    centerX: number;
    centerY: number;
};

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
    filled: (0 | 1 | 2)[][];
};

export type DraggedData = PointData & {
    patch: PatchData;
    onBlanket: boolean;
    canBePlaced: boolean;
    flipped: boolean;
    filled: (0 | 1 | 2)[][];
};

export type TimeBoardDataItem = {
    top: number;
    left: number;
    patch?: boolean;
    buttons?: number;
    type: 'start' | 'normal' | 'patch' | 'end';
    value: number;
    borderWidth: string;
};

export type PlayerData = {
    blanketX: number;
    blanketY: number;
    blanketSize: number;
    filled: (0 | 1)[][];
    patches: PatchData[];
    positions: PointData[];
    square7x7: { x: number; y: number } | null;
    buttons: number;
    buttonsAnimation: number[];
    income: number;
    time: number;
};

export type PointData = {
    x: number;
    y: number;
    angle: number;
    flipped?: boolean;
    isDragging?: boolean;
    filled?: number[][];
};
