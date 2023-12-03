import { faCircleDot, faHourglass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Action } from '../reducer/reducer';
import { PatchData, PointData } from '../reducer/types';

export type PatchProps = {
    data: PatchData;
    position: PointData;
    drag: boolean;
    isPlaced: boolean;
    dispatch: React.Dispatch<Action> | null;
};

export function Patch({ data, position, drag, isPlaced, dispatch }: PatchProps) {
    const controls = useAnimation();
    useEffect(() => {
        if (isPlaced || position.isDragging) {
            controls.set({
                x: position.x,
                y: position.y,
                rotate: `${-position.angle}rad`,
                rotateY: position.flipped ? 180 : 0
            });
        } else {
            controls.start({
                x: position.x,
                y: position.y,
                rotate: `${-position.angle}rad`,
                rotateY: position.flipped ? 180 : 0
            });
        }
    }, [position, isPlaced]);

    const sawed = isPlaced ? (
        <motion.path
            d={data.svg}
            fill="none"
            stroke="#606060"
            strokeWidth="1px"
            strokeDasharray="0.5 1"
            strokeDashoffset="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
        />
    ) : undefined;

    return (
        <div className="relative">
            {!isPlaced ? (
                <motion.div
                    className="absolute z-10 p-1 text-sm border border-black bottom-1 bg-slate-100"
                    animate={{
                        x: position.x,
                        y: position.y
                    }}
                    transition={{
                        duration: 0.5
                    }}
                >
                    <div>
                        <FontAwesomeIcon icon={faHourglass} className="text-xs" /> {data.time}
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCircleDot} className="text-xs" /> {data.price}
                    </div>
                </motion.div>
            ) : (
                ''
            )}
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                drag={drag}
                dragMomentum={false}
                animate={controls}
                transition={{
                    x: { duration: 0.5 },
                    y: { duration: 0.5 },
                    rotate: { duration: 0.5 },
                    rotateY: { duration: 0.5 }
                }}
                viewBox={data.viewBox}
                width={`${data.viewBox.split(' ').map(Number)[2] * 4}px`}
                style={{
                    position: 'absolute',
                    zIndex: 9
                }}
                onDragStart={() => dispatch?.({ type: 'DRAG_STARTED', payload: { data, position } })}
                // onDrag={(_, info) =>
                //     dispatch?.({
                //         type: 'DRAG',
                //         payload: { data, position: { x: info.point.x, y: info.point.y } }
                //     })
                // }
                onDragEnd={(_, info) => {
                    dispatch?.({
                        type: 'DRAG_ENDED',
                        payload: { data, position: { x: position.x + info.offset.x, y: position.y + info.offset.y } }
                    });
                }}
            >
                <path
                    d={data.svg}
                    fill={data.color}
                    // strokeWidth="1px" stroke="#606060"
                />
                {sawed}
            </motion.svg>
        </div>
    );
}
