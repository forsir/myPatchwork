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
    return flipMatrix(
        Array.from({ length: numCols }, (_, columnIndex) =>
            reverse(matrix.map((row) => row[numCols - 1 - columnIndex]))
        )
    );
}

export const flipMatrix = (matrix: number[][]) => {
    return reverse(matrix);
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
