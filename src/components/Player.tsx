import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { Action } from '../reducer/reducer';
import { Colors, PlayerData, PlayerType } from '../reducer/types';
import { Patch } from './Patch';
import { PlayerHead } from './PlayerHead';

export type PlayerProps = {
    playerData: PlayerData;
    playerId: PlayerType;
    currentPlayerId: PlayerType;
    size: number;
    colors: Colors;
    dispatch: React.Dispatch<Action>;
};

export function Player({ playerId, playerData, currentPlayerId, size, colors, dispatch }: PlayerProps) {
    const reference = useRef<HTMLDivElement>(null);

    const [windowWidth, windowHeight] = useWindowSize();

    useEffect(() => {
        const rect = reference.current?.getBoundingClientRect();
        if (rect) {
            dispatch({
                type: 'SET_PLAYER_SIZE',
                payload: { id: playerId, x: rect.left, y: rect.top, windowWidth, windowHeight }
            });
        }
    }, [windowWidth, windowHeight, reference]);

    const cells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells.push(
                <div key={`${i}_${j}`} className="text-xs aspect-square outline outline-1 outline-gray-500"></div>
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
            isDragged={false}
            onBlanket={false}
            position={playerData.positions[i]}
            tagBorder={0}
            cellSize={size}
            isSmall={false}
        />
    ));

    return (
        <motion.div className="relative">
            <PlayerHead
                playerName={{ player1: '1. hráč', player2: '2. hráč' }[playerId]}
                buttons={playerData.buttons}
                buttonsAnimation={playerData.buttonsAnimation}
                size={size}
                playerId={playerId}
                dispatch={dispatch}
            />
            <motion.div
                animate={{
                    filter: currentPlayerId === playerId ? undefined : 'grayscale(1) blur(2px)'
                }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                {patches}
                <motion.div
                    ref={reference}
                    className="grid grid-cols-9 aspect-square grid-rows-9"
                    style={{
                        width: `${size * 9}px`,
                        backgroundColor: playerId === 'player1' ? colors.player1 : colors.player2,
                        boxShadow:
                            currentPlayerId === playerId
                                ? `0 0 50px 15px ${playerId === 'player1' ? colors.player1 : colors.player2}`
                                : 'none'
                    }}
                    transition={{ duration: 2 }}
                >
                    {cells}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
