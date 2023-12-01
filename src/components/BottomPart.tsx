import { Action } from '../reducer/reducer';
import { PlayerData } from '../reducer/types';
import { Blanket } from './Blanket';
import { Menu } from './Menu';

export type BottomPartProps = {
    player1: PlayerData;
    player2: PlayerData;
    currentPlayerId: 'player1' | 'player2';
    dispatch: React.Dispatch<Action>;
};

export function BottomPart({ player1, player2, currentPlayerId, dispatch }: BottomPartProps) {
    return (
        <div className="flex flex-row justify-around w-full mt-20">
            <Blanket currentPlayerId={currentPlayerId} playerData={player1} playerId="player1" dispatch={dispatch} />
            <Menu dispatch={dispatch} />
            <Blanket currentPlayerId={currentPlayerId} playerData={player2} playerId="player2" dispatch={dispatch} />
        </div>
    );
}
