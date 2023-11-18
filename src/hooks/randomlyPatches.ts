function swap<T>(arr: T[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

// Use the Fisher-Yates shuffle algorithm
function randomSortArray<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        swap(arr, i, j);
    }
    return arr;
}

export function randomlyPatches<T extends { id: string }>(array: T[]): T[] {
    const newArray = randomSortArray([...array]);

    const lastElementIndex = newArray.findIndex((i) => i.id === '0_0');
    swap(newArray, lastElementIndex, newArray.length - 1);

    return newArray;
}
