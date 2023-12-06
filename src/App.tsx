import { useEffect, useReducer, useRef } from 'react';
import { BottomPart } from './components/BottomPart';
import { TopPart } from './components/TopPart';
import { Winner } from './components/Winner';
import { initial, reducer } from './reducer/reducer';

export default function App() {
    const [state, dispatch] = useReducer(reducer, initial);
    const main = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const a = (main?.current?.clientWidth ?? 800) / 2;
        const b = (main?.current?.clientHeight ?? 560) / 4;
        const x = (main?.current?.clientWidth ?? 1000) / 2;
        const y = (main?.current?.clientHeight ?? 540) / 4;
        dispatch({ type: 'INIT_GAME', payload: { x, y, a, b } });
    }, []);

    return (
        <div ref={main} className="relative w-screen h-screen overflow-hidden bg-orange-200">
            {state.winner ? <Winner state={state} /> : undefined}
            <TopPart
                patchPositions={state.patchPositions}
                patches={state.patches}
                draggedData={state.dragged}
                timeBoardData={state.timeBoardData}
                gameData={state.gameData}
                player1={state.player1}
                player2={state.player2}
                currentPlayerId={state.currentPlayerId}
                overlaps={state.overlaps}
                isSmallPatch={state.smallPatches > 0}
                dispatch={dispatch}
            />
            <BottomPart
                dispatch={dispatch}
                player1={state.player1}
                player2={state.player2}
                menuData={state.dragged}
                gameData={state.gameData}
                isSmallPatch={state.smallPatches > 0}
                currentPlayerId={state.currentPlayerId}
            />
        </div>
    );
}
