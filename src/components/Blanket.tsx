import { PointData } from '../reducer/types';

export type BlanketProps = {
    positions: PointData[];
    cellSize: number;
};

export function Blanket({ positions, cellSize }: BlanketProps) {
    return (
        <div
            className="absolute"
            style={{
                top: `${positions[0].y - cellSize / 2}px`,
                left: `${positions[0].x - cellSize / 2}px`,
                width: `${positions[2].x - positions[0].x + cellSize * 4}px`,
                height: `${cellSize * 5}px`,
                backgroundColor: 'rgb(255, 196, 58, 0.5)'
            }}
        ></div>
    );
}
