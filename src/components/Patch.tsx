import { motion } from 'framer-motion';
import { Action } from '../reducer/reducer';

export type PatchProps = {
    id: string;
    name: string;
    x: number;
    y: number;
    height: number;
    width: number;
    path: string;
    rotated?: boolean;
    sawed?: boolean;
    dispatch: React.Dispatch<Action>;
};

export default function Part({ path, dispatch }: PatchProps) {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 -1 22 22"
            className="absolute w-16"
            //            style={{ top: y, left: x, transform: item.rotated ? 'rotate(90deg);' : '' }}
            dragMomentum={false}
            // onDragStart={() => dispatch({ type: 'DRAG_STARTED', payload: { item } })}
            // onDragEnd={() => dispatch({ type: 'DRAG_ENDED', payload: { item } })}
            // // // animate={!isDragging}
            onAnimationComplete={() => dispatch({ type: 'ANIMATION_ENDED' })}
            initial={false}
            drag
        >
            <g
                //   transform={item.rotated ? 'translate(20) rotate(90)' : ''}
                stroke="#606060"
                strokeLinejoin="round"
                // strokeWidth={item.sawed ? '2' : ''}
                // strokeDasharray={item.sawed ? '0.5 1' : ''}
                // strokeDashoffset={item.sawed ? '3' : ''}
                fill="lightgray"
            >
                <path d={path} />
            </g>
        </motion.svg>
    );
}
