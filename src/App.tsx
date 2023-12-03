import { useEffect, useReducer, useRef } from 'react';
import { BottomPart } from './components/BottomPart';
import { TopPart } from './components/TopPart';
import { initial, reducer } from './reducer/reducer';

export default function App() {
    const [state, dispatch] = useReducer(reducer, initial);
    const main = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const a = (main?.current?.clientWidth ?? 800) / 2;
        const b = (main?.current?.clientHeight ?? 560) / 4;
        const x = (main?.current?.clientWidth ?? 1000) / 2;
        const y = (main?.current?.clientHeight ?? 540) / 4;
        dispatch({ payload: { x, y, a, b }, type: 'INIT_GAME' });
    }, []);

    return (
        <div ref={main} className="relative w-screen h-screen overflow-hidden">
            <TopPart
                patchPositions={state.patchPositions}
                patches={state.patches}
                dispatch={dispatch}
                dragged={state.dragged}
                scoreBoardData={state.scoreBoardData}
            />
            <BottomPart
                dispatch={dispatch}
                player1={state.player1}
                player2={state.player2}
                menuData={state.dragged}
                currentPlayerId={state.currentPlayerId}
            />
        </div>
    );
}
