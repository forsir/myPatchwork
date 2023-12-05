import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { Action } from '../reducer/reducer';
import { PlayerData } from '../reducer/types';
import { Patch } from './Patch';

export type BlanketProps = {
    playerData: PlayerData;
    playerId: 'player1' | 'player2';
    currentPlayerId: 'player1' | 'player2';
    size: number;
    dispatch: React.Dispatch<Action>;
};

export function Player({ playerId, playerData, currentPlayerId, size, dispatch }: BlanketProps) {
    const reference = useRef<HTMLDivElement>(null);

    const [windowWidth, windowHeight] = useWindowSize();

    useEffect(() => {
        const rect = reference.current?.getBoundingClientRect();
        if (rect) {
            dispatch({ type: 'SET_PLAYER_SIZE', payload: { id: playerId, x: rect.left, y: rect.top } });
        }
    }, [windowWidth, windowHeight]);

    const cells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells.push(
                <div key={`${i}_${j}`} className="text-xs aspect-square outline outline-1 outline-gray-500">
                    {/* {playerData.filled[i][j]} */}
                </div>
            );
        }
    }

    const patches = playerData.patches.map((patch, i) => (
        <Patch
            key={patch.id}
            data={patch}
            dispatch={null}
            drag={false}
            isPlaced={true}
            onBlanket={false}
            position={playerData.positions[i]}
            size={size}
        />
    ));

    return (
        <motion.div
            className="relative"
            animate={{
                filter: currentPlayerId === playerId ? undefined : 'grayscale(1)'
            }}
            transition={{ duration: 2 }}
        >
            {patches}
            <div className="absolute text-center bottom-full">
                <span className={playerId === currentPlayerId ? 'font-bold' : 'font-semibold'}>
                    {{ player1: 'Hráč 1', player2: 'Hráč 2' }[playerId]}
                </span>{' '}
                {playerData.buttons}
                <FontAwesomeIcon icon={faCircleDot} className="text-xs opacity-50" />, income: {playerData.income}{' '}
                <FontAwesomeIcon icon={faCircleDot} className="text-xs opacity-50" />
            </div>
            <motion.div
                ref={reference}
                className="grid grid-cols-9 aspect-square grid-rows-9"
                style={{
                    width: `${size * 9}px`,
                    backgroundColor: playerId === 'player1' ? 'rgb(95 158 208)' : 'rgb(208 177 95)'
                }}
                animate={
                    {
                        // boxShadow: currentPlayerId === playerId ? '0 0 50px 15px #48abe0' : 'none',
                    }
                }
                transition={{ duration: 2 }}
            >
                {cells}
            </motion.div>
        </motion.div>
    );
}
