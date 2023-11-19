import { BorderPosition, ScoreBoardDataItem } from '../reducer/types';

export type ScoreBoardProps = {
    items: ScoreBoardDataItem[];
};

export function ScoreBoard({ items }: ScoreBoardProps) {
    const size = 30;
    const borderSize = 2;

    function checkBorder(positions: BorderPosition[] | undefined, position: BorderPosition) {
        if (positions && positions.indexOf(position) > -1) {
            return `${borderSize}px`;
        }
        return 0;
    }

    const elements = items.map((item) => (
        <div
            className="absolute outline outline-gray-700"
            style={{
                top: `${item.y * size}px`,
                left: `${item.x * size}px`,
                width: `${(item.w ?? 1) * size}px`,
                height: `${(item.h ?? 1) * size}px`,
                outlineWidth: `${checkBorder(item.b, 't')} ${checkBorder(item.b, 'r')} ${checkBorder(
                    item.b,
                    'b'
                )} ${checkBorder(item.b, 'l')}`
            }}
        ></div>
    ));

    return (
        <div className="absolute" style={{ left: '400px', top: '200px' }}>
            <div className="relative">{elements}</div>
        </div>
    );
}
