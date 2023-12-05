import { Action } from '../reducer/reducer';
import { DraggedData, GameData, PatchData, PlayerData, PointData, TimeBoardDataItem } from '../reducer/types';
import { Patch } from './Patch';
import { TimeBoard } from './TimeBoard';

export type TopPartProps = {
    patches: PatchData[];
    patchPositions: PointData[];
    timeBoardData: TimeBoardDataItem[];
    draggedData: DraggedData | null;
    gameData: GameData;
    player1: PlayerData;
    player2: PlayerData;
    currentPlayerId: 'player1' | 'player2';
    overlaps: { x: number; y: number; data: number[][] } | undefined;
    dispatch: React.Dispatch<Action>;
};

export function TopPart({
    patches,
    patchPositions,
    timeBoardData,
    draggedData,
    gameData,
    player1,
    player2,
    currentPlayerId,
    overlaps,
    dispatch
}: TopPartProps) {
    const currentPlayer = currentPlayerId === 'player1' ? player1 : player2;

    const overlapElement: any[] = [];
    overlaps?.data.forEach((row, rowIndex) =>
        row.forEach((value, columnIndex) => {
            if (value === 1) {
                overlapElement.push(
                    <div
                        key={`${rowIndex}_${columnIndex}`}
                        className="absolute z-60"
                        style={{
                            top: overlaps.y + gameData.patchCellSize * rowIndex,
                            left: overlaps.x + gameData.patchCellSize * columnIndex,
                            width: `${gameData.patchCellSize}px`,
                            height: `${gameData.patchCellSize}px`,
                            backgroundColor: 'red',
                            opacity: 0.5,
                            zIndex: 60,
                            pointerEvents: 'none'
                        }}
                    ></div>
                );
            }
        })
    );

    return (
        <div className="relative" style={{ height: '50vh' }}>
            <TimeBoard
                currentPlayerId={currentPlayerId}
                gameData={gameData}
                player1={player1}
                player2={player2}
                timeBoardData={timeBoardData}
            />
            {patches.map((patch, i) => {
                return (
                    <Patch
                        key={patch.id}
                        data={patch}
                        drag={i < 3}
                        isPlaced={false}
                        isDragged={draggedData?.isDragging ?? false}
                        position={draggedData?.patch.id === patch.id ? draggedData : patchPositions[i]}
                        onBlanket={draggedData?.patch.id === patch.id ? draggedData.onBlanket : false}
                        cellSize={gameData.patchCellSize}
                        playerButtons={currentPlayer.buttons}
                        tagBorder={player1.blanketY}
                        dispatch={dispatch}
                    />
                );
            })}
            {overlapElement}
        </div>
    );
}
