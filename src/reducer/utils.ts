import { PatchData, PlayerType } from './types';

export function rotateMatrixLeft(matrix: number[][]): number[][] {
    const numCols: number = matrix[0].length;
    return Array.from({ length: numCols }, (_, columnIndex) => matrix.map((row) => row[numCols - 1 - columnIndex]));
}

function reverse<T>(array: T[]) {
    const newArray = [...array];
    newArray.reverse();
    return newArray;
}

export function rotateMatrixRight(matrix: number[][]): number[][] {
    const numCols: number = matrix[0].length;
    return reverse(
        Array.from({ length: numCols }, (_, columnIndex) =>
            reverse(matrix.map((row) => row[numCols - 1 - columnIndex]))
        )
    );
}

export const flipMatrix = (matrix: number[][]) => {
    return matrix.map((row) => reverse(row));
};

export function removeElement(patches: PatchData[], id: string | undefined) {
    if (id === undefined) {
        return patches;
    }

    const index = patches.findIndex((f) => f.id === id);
    const newP1 = patches.slice(0, index);
    const newP2 = patches.slice(index + 1);
    return [...newP2, ...newP1];
}

export function patchSize(dimension: number, size: number) {
    return (dimension / 5) * size;
}

export function checkFill(player: number[][], patch: number[][], x: number, y: number): null | number[][] {
    let isSet = false;
    const overlaps = Array.from({ length: 9 }, () => Array(9).fill(0));

    for (let rowIndex = 0; rowIndex < patch.length; rowIndex++) {
        const row = patch[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const value = row[columnIndex];
            if (value > 0 && player[rowIndex + y][columnIndex + x] > 0) {
                overlaps[rowIndex + y][columnIndex + x] = 1;
                isSet = true;
            }
        }
    }

    return isSet ? overlaps : null;
}

export function placeFill(player: number[][], patch: number[][], x: number, y: number): number[][] {
    const newPlayer = player.map((r) => r.map((c) => c));

    patch.forEach((row, rowIndex) =>
        row.forEach((value, columnIndex) => {
            if (value > 0) {
                newPlayer[rowIndex + y][columnIndex + x] = value;
            }
        })
    );

    return newPlayer;
}

export function getNextPlayer(currentPlayerId: PlayerType, player1Time: number, player2Time: number): PlayerType {
    if (player1Time < player2Time) {
        return 'player1';
    }
    if (player2Time < player1Time) {
        return 'player2';
    }
    return currentPlayerId;
}
