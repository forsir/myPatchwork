import { faCircleDot, faHourglass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Action } from '../reducer/reducer';
import { PatchData, PointData } from '../reducer/types';
import { patchSize } from '../reducer/utils';

export type PatchProps = {
    data: PatchData;
    position: PointData;
    drag: boolean;
    onBlanket: boolean;
    isPlaced: boolean;
    size: number;
    dispatch: React.Dispatch<Action> | null;
};

export function Patch({ data, position, drag, onBlanket, isPlaced, size, dispatch }: PatchProps) {
    const controls = useAnimation();
    useEffect(() => {
        let xt = 0;
        let yt = 0;

        if (position.angle % 180 !== 0) {
            xt = (data.width - data.height) / 2;
            yt = (data.height - data.width) / 2;
        }

        if (isPlaced || position.isDragging) {
            controls.set({
                x: position.x - xt,
                y: position.y - yt,
                rotate: -position.angle,
                rotateY: position.flipped ? 180 : 0
            });
        } else {
            controls.start({
                x: position.x - xt,
                y: position.y - yt,
                rotate: -position.angle,
                rotateY: position.flipped ? 180 : 0,
                transition: onBlanket ? { duration: 0.1 } : { duration: 0.5 }
            });
        }
    }, [position, isPlaced]);

    // isPlaced = true;

    return (
        <div className="relative">
            {!isPlaced ? (
                <motion.div
                    className="absolute z-10 p-1 text-sm border border-black opacity-50 bottom-1 bg-slate-100"
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

            <div
                className="absolute z-10 text-sm border border-black bg-slate-100"
                style={{
                    left: position.x,
                    top: position.y
                }}
            >
                {(position.filled ?? data.filled)
                    .map((f) => f.join(' '))
                    .map((r) => (
                        <div>{r}</div>
                    ))}
            </div>

            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                drag={drag}
                dragMomentum={false}
                animate={controls}
                viewBox={`0 0 ${data.width} ${data.height}`}
                // transition={{
                //     x: { duration: 0.5 },
                //     y: { duration: 0.5 },
                //     rotate: { duration: 0.5 },
                //     rotateY: { duration: 0.5 }
                // }}
                width={`${patchSize(data.width, size)}px`}
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
                        payload: {
                            data,
                            position: {
                                x: position.x + info.offset.x,
                                y: position.y + info.offset.y,
                                angle: position.angle
                            }
                        }
                    });
                }}
            >
                <path
                    d={data.svg}
                    fill={data.color}
                    // strokeWidth="1px" stroke="#606060"
                />
                {isPlaced ? (
                    <path
                        d={data.svg}
                        fill="none"
                        stroke="#606060"
                        strokeWidth="1px"
                        strokeDasharray="0.5 1"
                        strokeDashoffset="3"
                    />
                ) : undefined}
            </motion.svg>
        </div>
    );
}
