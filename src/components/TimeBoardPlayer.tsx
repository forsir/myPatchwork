import { motion } from 'framer-motion';

export type timeBoardPlayerProps = {
    position: {
        left: number;
        top: number;
    };
    cellSize: number;
    space: number;
    color: string;
    isActive: boolean;
};

export function TimeBoardPlayer({ position, cellSize, space, color, isActive }: timeBoardPlayerProps) {
    return (
        <motion.div
            className="z-30 border-black border-solid rounded-full"
            style={{
                backgroundColor: color,
                width: `${cellSize - space * 2}px`,
                height: `${cellSize - space * 2}px`
            }}
            animate={{
                position: 'absolute',
                y: position.top * cellSize + space - 1,
                x: position.left * cellSize + space - 1,
                borderWidth: isActive ? '2px' : '1px'
            }}
            transition={{ duration: 0.5 }}
        ></motion.div>
    );
}
