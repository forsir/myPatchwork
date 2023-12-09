import { useEffect, useRef } from 'react';
import { Action } from '../reducer/reducer';
import { PlayerData, PlayerType } from '../reducer/types';

export type WinnerProps = {
    player1: PlayerData;
    player2: PlayerData;
    winner?: PlayerType | 'both';
    dispatch: React.Dispatch<Action>;
};

export function Winner({ player1, player2, winner, dispatch }: WinnerProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current) {
            if (winner) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [winner]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300">
            <dialog
                ref={dialogRef}
                className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
            >
                <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
                    {winner === 'both' ? 'Je to remíza' : `Vítězem je ${winner === 'player1' ? '1. hráč' : '2. hráč'}`}
                </div>
                <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
                    <div>1. hráč má {player1.buttons} knoflíků</div>
                    <div>2. hráč má {player2.buttons} knoflíků</div>
                </div>
                <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                    <button
                        onClick={() => dispatch({ type: 'NEW_GAME' })}
                        className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Hrát znovu
                    </button>
                </div>
            </dialog>
        </div>
    );
}
