import { BorderPosition, ScoreBoardDataItem } from '../reducer/types';

export type ScoreBoardItemProps = {
    data: ScoreBoardDataItem;
    size: number;
    borderSize: number;
};

export function ScoreBoardItem({ data, size, borderSize }: ScoreBoardItemProps) {
    function checkBorder(positions: BorderPosition[] | undefined, position: BorderPosition) {
        if (positions && positions.indexOf(position) > -1) {
            return `${borderSize}px`;
        }
        return 0;
    }

    return (
        <div
            key={data.id}
            className="absolute border-gray-900"
            style={{
                top: `${data.y * size}px`,
                left: `${data.x * size}px`,
                width: `${(data.w ?? 1) * size}px`,
                height: `${(data.h ?? 1) * size}px`,
                backgroundColor: data.color,
                borderWidth: `${checkBorder(data.b, 't')} ${checkBorder(data.b, 'r')} ${checkBorder(
                    data.b,
                    'b'
                )} ${checkBorder(data.b, 'l')}`
            }}
        ></div>
    );
}
