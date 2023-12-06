import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { Action } from '../reducer/reducer';
import { Colors, PlayerData, PlayerType } from '../reducer/types';
import { Patch } from './Patch';

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
            isDragged={false}
            onBlanket={false}
            position={playerData.positions[i]}
            tagBorder={0}
            cellSize={size}
        />
    ));

    return (
        <motion.div className="relative">
            <div className="absolute z-10 text-center bottom-full" style={{ width: `${size * 9}px` }}>
                <span className="font-semibold">{{ player1: 'Hráč 1', player2: 'Hráč 2' }[playerId]}</span>{' '}
                <FontAwesomeIcon icon={faCircleDot} className="text-xs opacity-50" /> {playerData.buttons}
                <span className="relative invisible inline">
                    &nbsp;
                    <span className="absolute bottom-0 left-0">
                        {playerData.buttonsAnimation?.map((value, index) => (
                            <span key={index} className="relative">
                                <motion.div
                                    key={index}
                                    className="absolute bottom-0 left-0 visible"
                                    initial={{ opacity: 1, fontSize: '1em' }}
                                    animate={{ opacity: 0, fontSize: '2em' }}
                                    transition={{ duration: 2 }}
                                    onAnimationComplete={() => {
                                        dispatch({ type: 'ANIMATION_END', payload: { player: playerId, index } });
                                    }}
                                >
                                    {(value >= 0 ? '+' : '') + value}
                                </motion.div>
                                {(value >= 0 ? '+' : '') + value}
                            </span>
                        ))}
                    </span>
                </span>
            </div>
            <motion.div
                animate={{
                    filter: currentPlayerId === playerId ? undefined : 'grayscale(1) blur(2px)'
                }}
                transition={{ duration: 1 }}
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
