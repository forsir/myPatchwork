import { Action } from '../reducer/reducer';
import { DraggedData, GameData, PlayerData, PlayerType } from '../reducer/types';
import { Menu } from './Menu';
import { Player } from './Player';

export type BottomPartProps = {
    player1: PlayerData;
    player2: PlayerData;
    currentPlayerId: PlayerType;
    menuData: DraggedData | null;
    gameData: GameData;
    isSmallPatch: boolean;
    dispatch: React.Dispatch<Action>;
};

export function BottomPart({
    player1,
    player2,
    currentPlayerId,
    menuData,
    gameData,
    isSmallPatch,
    dispatch
}: BottomPartProps) {
    return (
        <div className="flex flex-row justify-around w-full mt-20">
            <Player
                currentPlayerId={currentPlayerId}
                playerData={player1}
                playerId="player1"
                size={gameData.patchCellSize}
                colors={gameData.colors}
                dispatch={dispatch}
            />
            <Menu draggedData={menuData} isSmallPatch={isSmallPatch} dispatch={dispatch} />
            <Player
                currentPlayerId={currentPlayerId}
                playerData={player2}
                playerId="player2"
                size={gameData.patchCellSize}
                colors={gameData.colors}
                dispatch={dispatch}
            />
        </div>
    );
}
