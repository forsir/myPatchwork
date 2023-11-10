import { motion } from 'framer-motion';
import { useEffect, useReducer } from 'react';
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
        <div className="relative w-screen overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 left-0 grid grid-cols-10 gap-1">
                {state.cells.map((row, y) =>
                    row.map((_, x) => <div className="border-solid border-gray-500 border-2" key={`${y}_${x}`}></div>)
                )}
            </div>
            {state.dragging && draggingItem && (
                <>
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: 'rgba(239, 239, 239,.8)',
                            x: state.dragging.initialPoint.x * 44,
                            y: state.dragging.initialPoint.y * 44,
                            width: draggingItem.width * 44 - 2,
                            height: draggingItem.height * 44 - 2
                        }}
                    />
                    <motion.div
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
            )}
            {state.items.map((item) => {
                const x = item.x * 44;
                const y = item.y * 44;
                const width = item.width * 44 - 2;
                const height = item.height * 44 - 2;
                const isDragging = item.id === state.dragging?.id;

                return (
                    <motion.div
                        key={item.id}
                        drag
                        dragMomentum={false}
                        onDragStart={() => dispatch({ type: 'DRAG_STARTED', payload: { item } })}
                        onDragEnd={() => dispatch({ type: 'DRAG_ENDED', payload: { item } })}
                        onDrag={(_, info) => {
                            const point = {
                                x: Math.min(Math.max(Math.round((x + info.point.x) / 44), 0), 10 - item.width),
                                y: Math.min(Math.max(Math.round((y + info.point.y) / 44), 0), 10 - item.height)
                            };

                            if (state.dragging) {
                                const { nextPoint } = state.dragging;
                                if (point.x !== nextPoint.x || point.y !== nextPoint.y) {
                                    dispatch({
                                        type: 'DRAG_MOVED',
                                        payload: { item, point }
                                    });
                                }
                            }
                        }}
                        onAnimationComplete={() => dispatch({ type: 'ANIMATION_ENDED' })}
                        initial={false}
                        animate={!isDragging}
                        style={{
                            position: 'absolute',
                            top: y,
                            left: x,
                            width,
                            height,
                            border: '1px solid #000',
                            backgroundColor: '#efefef',
                            fontSize: 10,
                            textAlign: 'right',
                            padding: '2px 4px',
                            zIndex: isDragging ? 99 : 1
                        }}
                    >
                        {item.name}
                    </motion.div>
                );
            })}
        </div>
    );
}
