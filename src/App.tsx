import { useEffect, useReducer, useRef } from 'react';
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

    // const draggingItem = state.items.find((i) => i.id === state.dragging?.id);

    return (
        <div ref={main} className="relative w-screen h-screen overflow-hidden">
            <TopPart patchPositions={state.patchPositions} patches={state.patches} dispatch={dispatch} />
            {/* <div
                className="absolute top-0 left-0 grid grid-cols-10 gap-1 grid-rows-10"
                style={{ gridTemplateColumns: 'repeat(10, 42px)', gridAutoRows: '42px' }}
            >
                {state.cells.map((row, y) =>
                    row.map((_, x) => <div className="border-2 border-gray-200 border-solid" key={`${y}_${x}`}></div>)
                )}
            </div>
         */}
        </div>
    );
}
