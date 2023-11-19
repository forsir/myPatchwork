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
            {patches.map((item, i) => {
                if (dragged?.patch.id === item.id) {
                    return <Patch key={item.id} data={item} drag={i < 3} position={dragged} dispatch={dispatch} />;
                }
                return (
                    <Patch key={item.id} data={item} drag={i < 3} position={patchPositions[i]} dispatch={dispatch} />
                );
            })}
        </div>
    );
}
