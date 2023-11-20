import { useEffect, useRef } from 'react';
import { Action } from '../reducer/reducer';

export type BlanketProps = {
    dispatch: React.Dispatch<Action>;
    playerId: 'player1' | 'player2';
};

export function Blanket({ playerId, dispatch }: BlanketProps) {
    const reference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rect = reference.current?.getBoundingClientRect();
        if (rect) {
            dispatch({ type: 'SET_SIZES', payload: { id: playerId, x: rect.left, y: rect.top } });
        }
    }, [reference]);

    const cells = [];
    for (let i = 0; i < 81; i++) {
        cells.push(<div key={i} className="aspect-square outline outline-1 outline-gray-500"></div>);
    }

    return (
        <div
            ref={reference}
            className="grid grid-cols-9 aspect-square grid-rows-9"
            style={{ width: '180px', backgroundColor: ' #506d84' }}
        >
            {cells}
        </div>
    );
}
