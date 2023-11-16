import { useEffect, useReducer } from 'react';
import { initial, reducer } from './reducer/reducer';

export default function App() {
    const [state, dispatch] = useReducer(reducer, initial);

    useEffect(() => {
        // Add first items
        // dispatch({
        //     type: 'ADD_ITEM',
        //     payload: { item: { ...fruit.melon, x: 2, y: 2 } }
        // });
    }, []);

    // const draggingItem = state.items.find((i) => i.id === state.dragging?.id);

    return (
        <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden">
            {/* {state.items.map((item) => {
                // return <Part item={item} dispatch={dispatch} />;
            })} */}
            {/* <div
                className="absolute top-0 left-0 grid grid-cols-10 gap-1 grid-rows-10"
                style={{ gridTemplateColumns: 'repeat(10, 42px)', gridAutoRows: '42px' }}
            >
                {state.cells.map((row, y) =>
                    row.map((_, x) => <div className="border-2 border-gray-200 border-solid" key={`${y}_${x}`}></div>)
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
                    /> 
                </>
            )} */}
        </div>
    );
}
