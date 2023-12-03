import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { Action } from '../reducer/reducer';
import { PlayerData } from '../reducer/types';
import { Patch } from './Patch';

export type BlanketProps = {
    dispatch: React.Dispatch<Action>;
    playerData: PlayerData;
    playerId: 'player1' | 'player2';
    currentPlayerId: 'player1' | 'player2';
};

export function Blanket({ playerId, playerData, currentPlayerId, dispatch }: BlanketProps) {
    const reference = useRef<HTMLDivElement>(null);

    const [windowWidth, windowHeight] = useWindowSize();

    useEffect(() => {
        const rect = reference.current?.getBoundingClientRect();
        console.log('window rect', rect);
        if (rect) {
            dispatch({ type: 'SET_SIZES', payload: { id: playerId, x: rect.left, y: rect.top } });
        }
    }, [windowWidth, windowHeight]);

    const cells = [];
    for (let i = 0; i < 81; i++) {
        cells.push(<div key={i} className="aspect-square outline outline-1 outline-gray-500"></div>);
    }

    const patches = playerData.patches.map((patch, i) => (
        <Patch
            key={patch.id}
            data={patch}
            dispatch={null}
            drag={false}
            isPlaced={true}
            position={{ ...playerData.positions[i] }}
        />
    ));

    return (
        <div className="relative">
            {patches}
            <motion.div
                ref={reference}
                className="grid grid-cols-9 aspect-square grid-rows-9"
                style={{
                    width: '180px',
                    backgroundColor: playerId === 'player1' ? 'rgb(95 158 208)' : 'rgb(208 177 95)'
                }}
                animate={{
                    boxShadow: currentPlayerId === playerId ? '0 0 50px 15px #48abe0' : '0 0 0 0 #48abe0'
                }}
                transition={{ duration: currentPlayerId === playerId ? 2 : 0 }}
            >
                {cells}
            </motion.div>
        </div>
    );
}
