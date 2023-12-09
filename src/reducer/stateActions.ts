import { smallPatch } from '../data/smallPatchData';
import { DraggedData, Game } from './types';
import { addScoreAnimation, check7x7, checkFill, computeEmptySpaces, getNextPlayer, patchSize } from './utils';

export function setCurrentPlayer(state: Game): Game {
    const newPlayer = getNextPlayer(
        state.currentPlayerId,
        state.player1.time,
        state.player2.time,
        state.smallPatches > 0
    );
    return {
        ...state,
        currentPlayerId: newPlayer
    };
}

export function movePlayer(state: Game, incomeTime: number, toTime: number): Game {
    const newCurrentPlayer = { ...state[state.currentPlayerId] };
    let newSmallPatch = 0;
    let newTime = newCurrentPlayer.time;
    let newTimeBoardData = null;
    let incomeButtons = 0;
    let timeButtons = 0;

    if (newTime < 2) {
        newTime = 2;
    }

    let counter = 0;
    while (counter < incomeTime || newTime <= toTime) {
        newTime = Math.min(62, newTime + 1);
        counter++;
        timeButtons++;
        if (state.timeBoardData[newTime].patch) {
            newSmallPatch++;
            newTimeBoardData = newTimeBoardData ?? [...state.timeBoardData];
            newTimeBoardData[newTime] = { ...newTimeBoardData[newTime], patch: false };
            newTime++;
        } else if (state.timeBoardData[newTime].patch === false) {
            newTime++;
        }
        if (state.timeBoardData[newTime].buttons) {
            incomeButtons += newCurrentPlayer.income;
            newTimeBoardData = newTimeBoardData ?? [...state.timeBoardData];
            newTimeBoardData[newTime] = {
                ...newTimeBoardData[newTime],
                buttons: newTimeBoardData[newTime].buttons! - 1
            };
        }
    }

    newCurrentPlayer.time = newTime;
    addScoreAnimation(newCurrentPlayer, incomeButtons, toTime > 0 ? timeButtons : 0);
    newCurrentPlayer.buttons = newCurrentPlayer.buttons + incomeButtons + (toTime > 0 ? timeButtons : 0);

    return {
        ...state,
        smallPatches: newSmallPatch,
        timeBoardData: newTimeBoardData ?? state.timeBoardData,
        [state.currentPlayerId]: newCurrentPlayer
    };
}

export function checkPatchPlace(
    state: Game,
    newData: { x: number; y: number; angle: number; flipped?: boolean; filled?: number[][] }
): Game {
    if (!state.dragged) {
        return state;
    }

    let x = Math.round(newData.x);
    let y = Math.round(newData.y);
    const cellSize = state.gameData.patchCellSize;
    const cellSizeHalf = cellSize / 2;
    const patch =
        state.dragged!.patch.id === smallPatch.id
            ? smallPatch
            : state.patches.find((p) => p.id === state.dragged!.patch.id)!;
    const patchWidth = patchSize(newData.angle % 180 === 0 ? patch.width : patch.height, cellSize);
    const patchHeight = patchSize(newData.angle % 180 === 0 ? patch.height : patch.width, cellSize);
    const player = state[state.currentPlayerId];
    const newFilled = newData.filled ?? state.dragged.filled;

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
        x = Math.round(x);
        y = Math.round(y);

        onBlanket = true;

        const posX = Math.round((x - player.blanketX) / cellSize);
        const posY = Math.round((y - player.blanketY) / cellSize);
        overlaps = checkFill(player.filled, newFilled, posX, posY);
        canBePlaced = overlaps == null;
    }

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
        angle: newData.angle,
        filled: newFilled,
        flipped: newData.flipped ?? state.dragged.flipped
    } as DraggedData;

    return {
        ...state,
        overlaps: newOverlaps,
        dragged: newDragged
    };
}

export function checkWinner(state: Game): Game {
    if (state.player1.time < 60 || state.player2.time < 60) {
        return state;
    }

    const newPlayer1Data = { ...state.player1 };
    const newPlayer2Data = { ...state.player2 };
    const player1Spaces = computeEmptySpaces(newPlayer1Data.filled);
    const player2Spaces = computeEmptySpaces(newPlayer2Data.filled);
    const player1Square = state.player1.square7x7 ? 7 : 0;
    const player2Square = state.player2.square7x7 ? 7 : 0;

    addScoreAnimation(newPlayer1Data, -player1Spaces * 2, player1Square);
    newPlayer1Data.buttons -= player1Spaces * 2;
    newPlayer1Data.buttons += player1Square;

    addScoreAnimation(newPlayer2Data, -player2Spaces * 2, player2Square);
    newPlayer2Data.buttons -= player2Spaces * 2;
    newPlayer2Data.buttons += player2Square;

    const winner =
        newPlayer1Data.buttons > newPlayer2Data.buttons
            ? 'player1'
            : newPlayer1Data.buttons < newPlayer2Data.buttons
            ? 'player2'
            : 'both';

    return {
        ...state,
        player1: newPlayer1Data,
        player2: newPlayer2Data,
        winner
    };
}

export function stateCheck7x7(state: Game): Game {
    if (!state.isSquare7x7Free) {
        return state;
    }

    const currentPlayerId = state.currentPlayerId;
    const square = check7x7(state[currentPlayerId].filled);

    return {
        ...state,
        isSquare7x7Free: !square,
        [currentPlayerId]: {
            ...state[currentPlayerId],
            square7x7: square
        }
    };
}
