import { PatchData } from './types';

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

export function checkFill(player: number[][], patch: number[][], x: number, y: number): boolean {
    for (let rowIndex = 0; rowIndex < patch.length; rowIndex++) {
        const row = patch[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const value = row[columnIndex];
            if (value > 0 && player[rowIndex + y][columnIndex + x] > 0) {
                return false;
            }
        }
    }

    return true;
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
