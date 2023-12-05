import { Action } from '../reducer/reducer';
import { DraggedData, GameData, PatchData, PlayerData, PointData, TimeBoardDataItem } from '../reducer/types';
import { Patch } from './Patch';
import { TimeBoard } from './TimeBoard';

export type TopPartProps = {
    patches: PatchData[];
    patchPositions: PointData[];
    timeBoardData: TimeBoardDataItem[];
    dragged: DraggedData | null;
    gameData: GameData;
    player1: PlayerData;
    player2: PlayerData;
    currentPlayerId: 'player1' | 'player2';
    dispatch: React.Dispatch<Action>;
};

export function TopPart({
    patches,
    patchPositions,
    timeBoardData,
    dragged,
    gameData,
    player1,
    player2,
    currentPlayerId,
    dispatch
}: TopPartProps) {
    const currentPlayer = currentPlayerId === 'player1' ? player1 : player2;

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
                        position={dragged?.patch.id === patch.id ? dragged : patchPositions[i]}
                        onBlanket={dragged?.patch.id === patch.id ? dragged.onBlanket : false}
                        cellSize={gameData.patchCellSize}
                        playerButtons={currentPlayer.buttons}
                        dispatch={dispatch}
                    />
                );
            })}
        </div>
    );
}
