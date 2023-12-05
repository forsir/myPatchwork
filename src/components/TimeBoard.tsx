import { GameData, PlayerData, TimeBoardDataItem } from '../reducer/types';
import { TimeBoardItem } from './TimeBoardItem';
import { TimeBoardPlayer } from './TimeBoardPlayer';

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
        arrayGrid[data.top][data.left] = data;
    }

    const playerSpace = 3;

    return (
        <div className="absolute" style={{ left: '300px', top: '100px' }}>
            <div className="relative grid grid-cols-8 aspect-square grid-rows-8">
                <TimeBoardPlayer
                    cellSize={gameData.cellSize}
                    color={gameData.colors.player1}
                    left={timeBoardData[player1.time].left}
                    space={playerSpace}
                    top={timeBoardData[player1.time].top}
                />

                <TimeBoardPlayer
                    cellSize={gameData.cellSize}
                    color={gameData.colors.player2}
                    left={timeBoardData[player2.time].left}
                    space={playerSpace}
                    top={timeBoardData[player2.time].top}
                />

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
