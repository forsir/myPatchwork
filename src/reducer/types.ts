export type Game = {
    gameData: GameData;
    patches: PatchData[];
    patchPositions: PointData[];
    timeBoardData: TimeBoardDataItem[];
    dragged: DraggedData | null;
    player1: PlayerData;
    player2: PlayerData;
    smallPatch: boolean;
    currentPlayerId: PlayerType;
};

export type PlayerType = 'player1' | 'player2';

export type Colors = {
    player1: string;
    player2: string;
    timeStart: string;
    timeNormal: string;
    timeButton: string;
    timePatch: string;
    timeEnd: string;
};

export type GameData = {
    patchCellSize: number;
    timeCellSize: number;
    colors: Colors;
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
    filled: number[][];
};

export type DraggedData = PointData & {
    patch: PatchData;
    onBlanket: boolean;
    canBePlaced: boolean;
    filled: number[][];
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
    filled: number[][];
    overlaps?: number[][];
    patches: PatchData[];
    positions: PointData[];
    buttons: number;
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
