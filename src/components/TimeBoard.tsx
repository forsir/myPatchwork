import { motion } from 'framer-motion';
import { GameData, PlayerData, TimeBoardDataItem } from '../reducer/types';
import { TimeBoardItem } from './TimeBoardItem';

export type timeBoardProps = {
    gameData: GameData;
    timeBoardData: TimeBoardDataItem[];
    player1: PlayerData;
    player2: PlayerData;
    currentPlayerId: 'player1' | 'player2';
};

export const TimeBoard = ({ gameData, timeBoardData, player1, player2, currentPlayerId }: timeBoardProps) => {
    const arrayGrid = Array.from({ length: 8 }, () => Array(8).fill({})) as TimeBoardDataItem[][];

    for (let i = 0; i < timeBoardData.length; i++) {
        const data = timeBoardData[i];
        arrayGrid[data.left][data.top] = data;
    }

    const playerSpace = 3;

    return (
        <div className="absolute" style={{ left: '300px', top: '100px' }}>
            <div className="relative">
                <motion.div
                    className="z-10 border border-black border-solid rounded-full"
                    style={{
                        backgroundColor: gameData.colors.player1,
                        width: `${gameData.cellSize - playerSpace}px`,
                        height: `${gameData.cellSize - playerSpace}px`
                    }}
                    animate={{
                        position: 'absolute',
                        y: timeBoardData[player1.time].top * gameData.cellSize,
                        x: timeBoardData[player1.time].left * gameData.cellSize
                    }}
                    transition={{ duration: 1 }}
                ></motion.div>

                <motion.div
                    className="z-10 border border-black border-solid rounded-full"
                    style={{
                        backgroundColor: gameData.colors.player2,
                        width: `${gameData.cellSize - playerSpace}px`,
                        height: `${gameData.cellSize - playerSpace}px`
                    }}
                    animate={{
                        position: 'absolute',
                        y: timeBoardData[player2.time].top * gameData.cellSize,
                        x: timeBoardData[player2.time].left * gameData.cellSize
                    }}
                    transition={{ duration: 1 }}
                ></motion.div>

                {arrayGrid.map((row, i) =>
                    row.map((item, j) => (
                        <TimeBoardItem
                            key={`${i}_${j}`}
                            data={item}
                            size={gameData.cellSize}
                            colors={gameData.colors}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
