import { useEffect, useRef } from 'react';
import { Action } from '../reducer/reducer';
import { PlayerData } from '../reducer/types';

export type BlanketProps = {
    dispatch: React.Dispatch<Action>;
    playerData: PlayerData;
    playerId: 'player1' | 'player2';
    currentPlayerId: 'player1' | 'player2';
};

export function Blanket({ playerId, playerData, currentPlayerId, dispatch }: BlanketProps) {
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
            style={{
                width: '180px',
                backgroundColor: playerId === 'player1' ? '#506d84' : '#506d84',
                boxShadow: currentPlayerId === playerId ? '0 0 50px 15px #48abe0' : ''
            }}
        >
            {cells}
        </div>
    );
}
