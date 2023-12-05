import { motion } from 'framer-motion';

export type timeBoardPlayerProps = {
    position: {
        left: number;
        top: number;
    };
    cellSize: number;
    space: number;
    color: string;
};

export function TimeBoardPlayer({ position, cellSize, space, color }: timeBoardPlayerProps) {
    return (
        <motion.div
            className="z-30 border border-black border-solid rounded-full"
            style={{
                backgroundColor: color,
                width: `${cellSize - space * 2}px`,
                height: `${cellSize - space * 2}px`
            }}
            animate={{
                position: 'absolute',
                y: position.top * cellSize + space + 1,
                x: position.left * cellSize + space + 1
            }}
            transition={{ duration: 0.5 }}
        ></motion.div>
    );
}
