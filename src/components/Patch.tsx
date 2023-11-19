import { faCircleDot, faHourglass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { PointData } from '../hooks/createEllipse';
import { Action } from '../reducer/reducer';
import { PatchData } from '../reducer/types';

export type PatchProps = {
    data: PatchData;
    position: PointData;
    drag: boolean;
    dispatch: React.Dispatch<Action>;
};

export function Patch({ data, position, drag, dispatch }: PatchProps) {
    const sawed = data.sawed ? (
        <path
            d={data.svg}
            fill="none"
            stroke="#606060"
            strokeWidth="2px"
            strokeDasharray="0.5 1"
            strokeDashoffset="3"
        />
    ) : undefined;

    return (
        <div className="relative">
            <motion.div
                className="absolute bottom-0 z-10 p-1 text-sm border border-black bg-slate-100"
                animate={{
                    x: position.x,
                    y: position.y
                }}
                transition={{
                    duration: 1
                }}
            >
                <div>
                    <FontAwesomeIcon icon={faHourglass} /> {data.time}
                </div>
                <div>
                    <FontAwesomeIcon icon={faCircleDot} /> {data.price}
                </div>
            </motion.div>
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                drag={drag}
                dragMomentum={false}
                animate={{
                    x: position.x,
                    y: position.y,
                    rotate: `${-position.angle}rad`
                }}
                transition={{
                    duration: 1
                }}
                viewBox={data.viewBox}
                width={`${data.viewBox.split(' ').map(Number)[2] * 4}px`}
                style={{ position: 'absolute', transform: `rotate(${-position.angle}rad)` }}
                onDragStart={() => dispatch({ type: 'DRAG_STARTED', payload: { data, position } })}
                onDragEnd={() => dispatch({ type: 'DRAG_ENDED', payload: { data, position } })}
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
