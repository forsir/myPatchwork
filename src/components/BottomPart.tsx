import { Action } from '../reducer/reducer';
import { DraggedData, GameData, PlayerData } from '../reducer/types';
import { Menu } from './Menu';
import { Player } from './Player';

export type BottomPartProps = {
    player1: PlayerData;
    player2: PlayerData;
    currentPlayerId: 'player1' | 'player2';
    menuData: DraggedData | null;
    gameData: GameData;
    dispatch: React.Dispatch<Action>;
};

export function BottomPart({ player1, player2, currentPlayerId, menuData, gameData, dispatch }: BottomPartProps) {
    return (
        <div className="flex flex-row justify-around w-full mt-20">
            <Player
                currentPlayerId={currentPlayerId}
                playerData={player1}
                playerId="player1"
                size={gameData.patchCellSize}
                dispatch={dispatch}
            />
            <Menu data={menuData} dispatch={dispatch} />
            <Player
                currentPlayerId={currentPlayerId}
                playerData={player2}
                playerId="player2"
                size={gameData.patchCellSize}
                dispatch={dispatch}
            />
        </div>
    );
}
