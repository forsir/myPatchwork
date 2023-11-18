import { PointData } from '../hooks/createEllipse';
import { Action } from '../reducer/reducer';
import { PatchData } from '../reducer/types';
import { Patch } from './Patch';

export type TopPartProps = {
    patches: PatchData[];
    patchPositions: PointData[];
    dispatch: React.Dispatch<Action>;
};

export function TopPart({ patches, patchPositions, dispatch }: TopPartProps) {
    return (
        <div className="relative" style={{ height: '50vh' }}>
            {patches.map((item, i) => {
                return (
                    <Patch key={item.id} data={item} drag={i < 3} position={patchPositions[i]} dispatch={dispatch} />
                );
            })}
        </div>
    );
}
