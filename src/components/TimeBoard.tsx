import { GameData, PlayerData, PlayerType, TimeBoardDataItem } from '../reducer/types';
import { TimeBoardItem } from './TimeBoardItem';
import { TimeBoardPlayer } from './TimeBoardPlayer';

export type timeBoardProps = {
    gameData: GameData;
    timeBoardData: TimeBoardDataItem[];
    player1: PlayerData;
    player2: PlayerData;
    currentPlayerId: PlayerType;
};

export const TimeBoard = ({ gameData, timeBoardData, player1, player2, currentPlayerId }: timeBoardProps) => {
    const arrayGrid = Array.from({ length: 8 }, () => Array(8).fill({})) as TimeBoardDataItem[][];

    for (let i = 0; i < timeBoardData.length; i++) {
        const data = timeBoardData[i];
        arrayGrid[data.top][data.left] = data;
    }

    const playerSpace = 3;

    return (
        <div
            className="absolute"
            style={{
                left: `${gameData.centerX - gameData.timeCellSize * 4}px`,
                top: `${gameData.centerY - gameData.timeCellSize * 4}px`
            }}
        >
            <div className="relative grid grid-cols-8 aspect-square grid-rows-8">
                <TimeBoardPlayer
                    cellSize={gameData.timeCellSize}
                    color={gameData.colors.player1}
                    position={timeBoardData[player1.time]}
                    space={playerSpace}
                    isActive={currentPlayerId === 'player1'}
                />

                <TimeBoardPlayer
                    cellSize={gameData.timeCellSize}
                    color={gameData.colors.player2}
                    position={timeBoardData[player2.time]}
                    space={playerSpace}
                    isActive={currentPlayerId === 'player2'}
                />

                {arrayGrid.map((row, i) =>
                    row.map((item, j) => (
                        <TimeBoardItem
                            key={`${i}_${j}`}
                            data={item}
                            size={gameData.timeCellSize}
                            colors={gameData.colors}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
