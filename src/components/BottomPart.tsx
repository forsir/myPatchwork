import { Action } from '../reducer/reducer';
import { Blanket } from './Blanket';
import { Menu } from './Menu';

export type BottomPartProps = {
    dispatch: React.Dispatch<Action>;
};

export function BottomPart({ dispatch }: BottomPartProps) {
    return (
        <div className="flex flex-row justify-around w-full mt-20">
            <Blanket playerId="player1" dispatch={dispatch} />
            <Menu dispatch={dispatch} />
            <Blanket playerId="player1" dispatch={dispatch} />
        </div>
    );
}
