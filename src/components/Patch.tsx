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
    cellSize: number;
    dispatch: React.Dispatch<Action> | null;
};

export function Patch({ data, position, drag, onBlanket, isPlaced, cellSize, dispatch }: PatchProps) {
    const controls = useAnimation();
    useEffect(() => {
        let xt = 0;
        let yt = 0;

        if (position.angle % 180 !== 0) {
            xt = patchSize(data.width - data.height, cellSize) / 2;
            yt = patchSize(data.height - data.width, cellSize) / 2;
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

    const buttons: any[] = [];
    const scale = 0.7;
    data.filled.forEach((row, rowIndex) =>
        row.forEach((value, columnIndex) => {
            if (value === 2) {
                buttons.push(
                    <path
                        key={`${rowIndex}_${columnIndex}`}
                        d="M2.5 0A.125.125 90 002.5 5 .125.125 90 002.5 0M2.5.625A.125.125 90 012.5 4.375.125.125 90 012.5.625M2.5.75A.125.125 90 002.5 4.25.125.125 90 002.5.75M1.875 1.625A.125.125 90 011.875 2.25.125.125 90 011.875 1.625M1.875 2.75A.125.125 90 011.875 3.375.125.125 90 011.875 2.75M3.125 2.75A.125.125 90 013.125 3.375.125.125 90 013.125 2.75M3.125 1.625A.125.125 90 013.125 2.25.125.125 90 013.125 1.625"
                        fill="#6F5084"
                        stroke="#000000"
                        strokeWidth="0.15"
                        fillOpacity="0.7"
                        transform={`translate(${columnIndex * 5} ${rowIndex * 5}) scale(${scale}) translate(${
                            2.5 - scale * 2.5
                        } ${2.5 - scale * 2.5})`}
                    />
                );
            }
        })
    );

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
            {/* Možná ještě budu potřebovat
            {!isPlaced ? (
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
            ) : undefined} */}

            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                drag={drag}
                dragMomentum={false}
                animate={controls}
                viewBox={`0 0 ${data.width} ${data.height}`}
                width={`${patchSize(data.width, cellSize)}px`}
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
                {buttons}
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
