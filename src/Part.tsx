import { motion } from 'framer-motion';
import { Action } from './reducer';
import { Item } from './types';

export type partProps = {
    item: Item;
    dispatch: React.Dispatch<Action>;
};

export default function Part({ item, dispatch }: partProps) {
    const x = item.x * 44;
    const y = item.y * 44;
    const width = item.width * 44 - 2;
    const height = item.height * 44 - 2;
    // const isDragging = item.id === state.dragging?.id;

    return (
        <motion.div
            className="absolute w-16"
            style={{ top: y, left: x }}
            dragMomentum={false}
            onDragStart={() => dispatch({ type: 'DRAG_STARTED', payload: { item } })}
            onDragEnd={() => dispatch({ type: 'DRAG_ENDED', payload: { item } })}
            onDrag={(_, info) => {
                const point = {
                    x: Math.min(Math.max(Math.round((x + info.point.x) / 44), 0), 10 - item.width),
                    y: Math.min(Math.max(Math.round((y + info.point.y) / 44), 0), 10 - item.height)
                };

                //     if (state.dragging) {
                //         const { nextPoint } = state.dragging;
                //         if (point.x !== nextPoint.x || point.y !== nextPoint.y) {
                //             dispatch({
                //                 type: 'DRAG_MOVED',
                //                 payload: { item, point }
                //             });
                //         }
                //     }
            }}
            onAnimationComplete={() => dispatch({ type: 'ANIMATION_ENDED' })}
            initial={false}
            drag
            // // animate={!isDragging}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <g fill="#61DAFB">
                    <path d="M0 0 10 0 10 10 20 10 20 20 0 20 0 0" />
                </g>
            </svg>
        </motion.div>
    );
}
