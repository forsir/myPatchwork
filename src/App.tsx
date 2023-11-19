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

    const draggingItem = state.patches.find((i) => i.id === state.dragged?.id);

    return (
        <div ref={main} className="relative w-screen h-screen overflow-hidden">
            <TopPart
                patchPositions={state.patchPositions}
                patches={state.patches}
                dispatch={dispatch}
                scoreBoardData={state.scoreBoardData}
            />
            <BottomPart dispatch={dispatch} />
        </div>
    );
}
