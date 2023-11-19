import { patchesData } from '../data/patchesData';
import { scoreBoardData } from '../data/scoreBoardData';
import { createEllipse } from '../hooks/createEllipse';
import { randomlyPatches } from '../hooks/randomlyPatches';
import { Game, PatchData } from './types';

export function init(x: number, y: number, a: number, b: number, state: Game): Game {
    const patches = randomlyPatches(patchesData);
    const positions = createEllipse(x, y, a, b, patches.length);
    const scoreBoardDataItems = [...scoreBoardData];
    return { ...state, patches: patches, patchPositions: positions, scoreBoardData: scoreBoardDataItems };
}

function removeElement(patches: PatchData[], id: string) {
    const index = patches.findIndex((f) => f.id === id);
    const newP1 = patches.slice(0, index);
    const newP2 = patches.slice(index + 1);
    return [...newP2, ...newP1];
}

export function dragEnd(id: string, state: Game): Game {
    return { ...state, patches: removeElement(state.patches, id) };
}
