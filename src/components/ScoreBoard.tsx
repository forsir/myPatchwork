import { ScoreBoardDataItem } from '../reducer/types';
import { ScoreBoardItem } from './ScoreBoardItem';

export type ScoreBoardProps = {
    items: ScoreBoardDataItem[];
};

export function ScoreBoard({ items }: ScoreBoardProps) {
    const size = 15;
    const borderSize = 2;

    const elements = items.map((item) => <ScoreBoardItem data={item} borderSize={borderSize} size={size} />);

    return (
        <div className="absolute" style={{ left: '300px', top: '100px' }}>
            <div className="relative">{elements}</div>
        </div>
    );
}
