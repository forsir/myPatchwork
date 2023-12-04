import { Colors, TimeBoardDataItem } from '../reducer/types';

export type ScoreBoardItemProps = {
    data: TimeBoardDataItem;
    size: number;
    colors: Colors;
};

export function TimeBoardItem({ data, size, colors }: ScoreBoardItemProps) {
    function getColor(type: string) {
        switch (type) {
            case 'start':
                return colors.timeStart;
            case 'normal':
                return colors.timeNormal;
            case 'patch':
                return colors.timePatch;
            case 'end':
                return colors.timeEnd;
            default:
                return '';
        }
    }

    return (
        <div
            className=""
            style={{
                backgroundColor: getColor(data.type),
                width: `${size}px`,
                height: `${size}px`,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#000000'
            }}
        >
            {data.button ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width={`${size}px`}>
                    <g>
                        <path
                            d="M 20 0 L 20 40 A 1 1 90 0 0 20 0 A 1 1 90 0 0 20 40 M 20 5 A 1 1 90 0 1 20 35 A 1 1 0 0 1 20 5 A 1 1 90 0 0 20 5 M 20 6 A 1 1 0 0 0 20 34 A 1 1 0 0 0 20 6 M 15 13 A 1 1 90 0 1 15 18 A 1 1 90 0 1 15 13 M 15 22 A 1 1 90 0 1 15 27 A 1 1 90 0 1 15 22 M 25 22 A 1 1 90 0 1 25 27 A 1 1 90 0 1 25 22 M 25 13 A 1 1 90 0 1 25 18 A 1 1 90 0 1 25 13"
                            fill="#6F5084"
                            stroke="#000000"
                            strokeWidth="0.15"
                        />
                    </g>
                </svg>
            ) : null}
            {/* {cell.text} */}
        </div>
    );
}
