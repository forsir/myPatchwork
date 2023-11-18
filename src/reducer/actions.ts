import { patchesData } from '../data/patchesData';
import { createEllipse } from '../hooks/createEllipse';
import { randomlyPatches } from '../hooks/randomlyPatches';
import { Game } from './types';

export function init(x: number, y: number, a: number, b: number, state: Game): Game {
    const patches = randomlyPatches(patchesData);
    const positions = createEllipse(x, y, a, b, patches.length);
    return { ...state, patches: patches, patchPositions: positions };
}
