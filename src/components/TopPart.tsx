import { PointData } from '../hooks/createEllipse';
import { Action } from '../reducer/reducer';
import { DraggedData, PatchData, ScoreBoardDataItem } from '../reducer/types';
import { Patch } from './Patch';
import { ScoreBoard } from './ScoreBoard';

export type TopPartProps = {
    patches: PatchData[];
    patchPositions: PointData[];
    scoreBoardData: ScoreBoardDataItem[];
    dragged: DraggedData | null;
    dispatch: React.Dispatch<Action>;
};

export function TopPart({ patches, patchPositions, scoreBoardData, dragged, dispatch }: TopPartProps) {
    return (
        <div className="relative" style={{ height: '50vh' }}>
            <ScoreBoard items={scoreBoardData} />
            {patches.map((patch, i) => {
                return (
                    <Patch
                        key={patch.id}
                        data={patch}
                        drag={i < 3}
                        position={dragged?.patch.id === patch.id ? dragged : patchPositions[i]}
                        dispatch={dispatch}
                    />
                );
            })}
        </div>
    );
}
