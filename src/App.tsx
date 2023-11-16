import { useEffect, useReducer } from 'react';
import Part from './Part';
import { fruit } from './fruit';
import { initial, reducer } from './reducer';

export default function App() {
    const [state, dispatch] = useReducer(reducer, initial);

    useEffect(() => {
        // Add first items
        dispatch({
            type: 'ADD_ITEM',
            payload: { item: { ...fruit.melon, x: 2, y: 2 } }
        });

        dispatch({
            type: 'ADD_ITEM',
            payload: { item: { ...fruit.apple, x: 5, y: 6 } }
        });

        dispatch({
            type: 'ADD_ITEM',
            payload: { item: { ...fruit.banana, x: 6, y: 1 } }
        });
    }, []);

    const draggingItem = state.items.find((i) => i.id === state.dragging?.id);

    return (
        <div className="relative w-screen overflow-hidden flex items-center justify-center h-screen">
            <div
                className="absolute top-0 left-0 grid grid-cols-10 grid-rows-10 gap-1"
                style={{ gridTemplateColumns: 'repeat(10, 42px)', gridAutoRows: '42px' }}
            >
                {state.cells.map((row, y) =>
                    row.map((_, x) => <div className="border-solid border-gray-200 border-2" key={`${y}_${x}`}></div>)
                )}
            </div>
            {state.dragging && draggingItem && (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-1 -1 22 22"
                        className="absolute w-16"
                        style={{ top: state.dragging.initialPoint.y, left: state.dragging.initialPoint.x }}
                    >
                        <g stroke="#606060" strokeLinejoin="round" fill="none">
                            <path d={state.dragging.path} />
                        </g>
                    </svg>
                    {/* <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            border: '1px solid #000',
                            backgroundColor: state.dragging.valid ? 'rgb(152, 195, 121)' : 'rgb(224, 109, 118)',
                            x: state.dragging.nextPoint.x * 44,
                            y: state.dragging.nextPoint.y * 44,
                            width: draggingItem.width * 44 - 2,
                            height: draggingItem.height * 44 - 2
                        }}
                    /> */}
                </>
            )}
            {state.items.map((item) => {
                return <Part item={item} dispatch={dispatch} />;
            })}
        </div>
    );
}
