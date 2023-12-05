import { DraggedData, Game, PlayerData } from './types';
import { checkFill, getNextPlayer, patchSize } from './utils';

export function setCurrentPlayer(state: Game): Game {
    const newPlayer = getNextPlayer(state.currentPlayerId, state.player1.time, state.player2.time);
    return {
        ...state,
        currentPlayerId: newPlayer
    };
}

export function movePlayer(state: Game, incomeTime: number, toTime: number): Game {
    const currentPlayer = state[state.currentPlayerId];
    let newSmallPatch = false;
    let newTime = currentPlayer.time;
    let newTimeBoardData = null;
    let incomeButtons = 0;
    let timeButtons = 0;

    if (newTime < 2) {
        newTime = 2;
        incomeTime--;
    }

    let counter = 0;
    while (counter < incomeTime || newTime <= toTime) {
        counter++;
        newTime++;
        timeButtons++;
        if (state.timeBoardData[newTime].patch) {
            newSmallPatch = true;
            newTimeBoardData = newTimeBoardData ?? [...state.timeBoardData];
            newTimeBoardData[newTime] = { ...newTimeBoardData[newTime], patch: false };
            newTime++;
        } else if (state.timeBoardData[newTime].patch == false) {
            newTime++;
        }
        if (state.timeBoardData[newTime].buttons) {
            incomeButtons += currentPlayer.income;
            newTimeBoardData = newTimeBoardData ?? [...state.timeBoardData];
            newTimeBoardData[newTime] = {
                ...newTimeBoardData[newTime],
                buttons: newTimeBoardData[newTime].buttons! - 1
            };
        }
    }

    if (newTime > 62) {
        newTime = 62;
    }

    return {
        ...state,
        smallPatch: newSmallPatch,
        timeBoardData: newTimeBoardData ?? state.timeBoardData,
        [state.currentPlayerId]: {
            ...currentPlayer,
            time: newTime,
            buttons: currentPlayer.buttons + incomeButtons + (toTime > 0 ? timeButtons : 0)
        } as PlayerData
    };
}

export function checkPatchPlace(state: Game, id: string, position: { x: number; y: number; angle: number }): Game {
    if (!state.dragged) {
        return state;
    }

    let x = Math.round(position.x);
    let y = Math.round(position.y);
    const cellSize = state.gameData.patchCellSize;
    const cellSizeHalf = cellSize / 2;
    const patch = state.patches.find((p) => p.id === id)!;
    const patchWidth = patchSize(position.angle % 180 === 0 ? patch.width : patch.height, cellSize);
    const patchHeight = patchSize(position.angle % 180 === 0 ? patch.height : patch.width, cellSize);
    const player = state[state.currentPlayerId];

    let onBlanket = false;
    let canBePlaced = true;
    let overlaps = null;
    if (
        x > player.blanketX - cellSizeHalf &&
        x < player.blanketX + player.blanketSize + cellSizeHalf - patchWidth &&
        y > player.blanketY - cellSizeHalf &&
        y < player.blanketY + player.blanketSize + cellSizeHalf - patchHeight
    ) {
        x = player.blanketX + Math.round((x - player.blanketX) / cellSize) * cellSize;
        y = player.blanketY + Math.round((y - player.blanketY) / cellSize) * cellSize;
        onBlanket = true;

        const posX = Math.round((x - player.blanketX) / cellSize);
        const posY = Math.round((y - player.blanketY) / cellSize);
        overlaps = checkFill(player.filled, state.dragged.filled, posX, posY);
        canBePlaced = overlaps == null;
    }

    x = Math.round(x);
    y = Math.round(y);

    let newOverlaps = undefined;
    if (!canBePlaced) {
        const currentPlayer = state[state.currentPlayerId];
        newOverlaps = {
            x: currentPlayer.blanketX,
            y: currentPlayer.blanketY,
            data: overlaps
        } as { x: number; y: number; data: number[][] };
    }

    const newDragged = {
        ...state.dragged,
        x,
        y,
        isDragging: false,
        onBlanket,
        canBePlaced,
        overlaps: newOverlaps
    } as DraggedData;

    return {
        ...state,
        dragged: newDragged
    };
}
