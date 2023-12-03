import { PatchData } from './types';

export function rotateMatrixLeft(matrix: number[][]): number[][] {
    const numCols: number = matrix[0].length;
    return Array.from({ length: numCols }, (_, columnIndex) => matrix.map((row) => row[numCols - 1 - columnIndex]));
}

export function rotateMatrixRight(matrix: number[][]): number[][] {
    const numCols: number = matrix[0].length;
    return flipMatrix(
        Array.from({ length: numCols }, (_, columnIndex) =>
            matrix.map((row) => row[numCols - 1 - columnIndex]).reverse()
        )
    );
}

export const flipMatrix = (matrix: number[][]) => {
    return matrix.map((row) => row.reverse());
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
