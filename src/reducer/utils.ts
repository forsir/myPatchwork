import { PatchData, PlayerData, PlayerType } from './types';

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
    const index = patches.findIndex((f) => f.id === id);
    if (index < 0) {
        return patches;
    }

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

export function placeFill(player: number[][], patch: number[][], x: number, y: number): (0 | 1)[][] {
    const newPlayer = player.map((r) => r.map((c) => c)) as (0 | 1)[][];

    patch.forEach((row, rowIndex) =>
        row.forEach((value, columnIndex) => {
            if (value > 0) {
                newPlayer[rowIndex + y][columnIndex + x] = value > 0 ? 1 : 0;
            }
        })
    );

    return newPlayer;
}

export function getNextPlayer(
    currentPlayerId: PlayerType,
    player1Time: number,
    player2Time: number,
    isSmallPatch: boolean
): PlayerType {
    if (isSmallPatch) {
        return currentPlayerId;
    }

    if (player1Time < player2Time) {
        return 'player1';
    }
    if (player2Time < player1Time) {
        return 'player2';
    }
    return currentPlayerId;
}

export function addScoreAnimation(player: PlayerData, ...add: number[]) {
    player.buttonsAnimation = [...player.buttonsAnimation, ...add.filter((a) => a !== 0)];
}

export function computeEmptySpaces(player: number[][]): number {
    let spaces = 0;

    player.forEach((row) =>
        row.forEach((value) => {
            if (value === 0) {
                spaces++;
            }
        })
    );

    return spaces;
}

export function check7x7(player: number[][]): { x: number; y: number } | null {
    let rowSum = new Array(9).fill(0);
    let colSum = new Array(9).fill(0);

    let rowStart = 0;
    let rowEnd = 2;
    let colStart = 0;
    let colEnd = 2;

    for (let counter = 0; counter < 9; counter++) {
        rowSum[counter] = player[counter].reduce((p, c) => p + c, 0);

        if (rowSum[counter] < 7) {
            if (counter <= 2) {
                rowStart = counter + 1;
            } else if (counter >= 7) {
                rowEnd = Math.min(counter - 7, rowEnd);
            } else {
                return null;
            }
        }

        colSum[counter] = player.reduce((p, c) => p + c[counter], 0);
        if (colSum[counter] < 7) {
            if (counter <= 2) {
                colStart = counter + 1;
            } else if (counter >= 7) {
                colEnd = Math.min(counter - 7, colEnd);
            } else {
                return null;
            }
        }
    }

    for (let rowCounter = rowStart; rowCounter <= rowEnd; rowCounter++) {
        for (let columnCounter = colStart; columnCounter <= colEnd; columnCounter++) {
            let total = 0;
            for (let row = rowCounter; row < rowCounter + 7; row++) {
                for (let column = columnCounter; column < columnCounter + 7; column++) {
                    total += player[row][column];
                }
            }
            if (total === 49) {
                return { x: rowCounter, y: columnCounter };
            }
        }
    }

    return null;
}
