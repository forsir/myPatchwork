import { motion } from 'framer-motion';
import { Colors, TimeBoardDataItem } from '../reducer/types';

export type ScoreBoardItemProps = {
    data: TimeBoardDataItem;
    size: number;
    colors: Colors;
};

export function TimeBoardItem({ data, size, colors }: ScoreBoardItemProps) {
    function getColor(type: string) {
        switch (type) {
            case 'start':
                return colors.timeStart;
            case 'normal':
                return colors.timeNormal;
            case 'patch':
                return colors.timePatch;
            case 'end':
                return colors.timeEnd;
            default:
                return '';
        }
    }

    return (
        <motion.div
            className=""
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderWidth: data.borderWidth,
                borderStyle: 'solid',
                borderColor: '#000000'
            }}
            animate={{
                backgroundColor: data.patch === false ? colors.timePatchOut : getColor(data.type)
            }}
        >
            {data.buttons !== undefined ? (
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                    width={`${size - 4}px`}
                    animate={{ opacity: data.buttons / 3 + 0.33 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{ margin: '1px 0 0 1px' }}
                >
                    <path
                        d="M20 0A1 1 90 0020 40 1 1 0 0020 0M20 5A1 1 90 0120 35 1 1 0 0120 5M20 6A1 1 0 0020 34 1 1 0 0020 6M15 13A1 1 90 0115 18 1 1 90 0115 13M15 22A1 1 90 0115 27 1 1 90 0115 22M25 22A1 1 90 0125 27 1 1 90 0125 22M25 13A1 1 90 0125 18 1 1 90 0125 13"
                        fill="#6F5084"
                        stroke="#000000"
                        strokeWidth="0.15"
                    />
                </motion.svg>
            ) : null}
            {/* {cell.text} */}
        </motion.div>
    );
}
