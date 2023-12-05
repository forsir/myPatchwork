import { motion } from 'framer-motion';

export type timeBoardPlayerProps = {
    left: number;
    top: number;
    cellSize: number;
    space: number;
    color: string;
};

export function TimeBoardPlayer({ left, top, cellSize, space, color }: timeBoardPlayerProps) {
    return (
        <motion.div
            className="z-10 border border-black border-solid rounded-full"
            style={{
                backgroundColor: color,
                width: `${cellSize - space * 2}px`,
                height: `${cellSize - space * 2}px`
            }}
            animate={{
                position: 'absolute',
                y: top * cellSize + space + 1,
                x: left * cellSize + space + 1
            }}
            transition={{ duration: 1 }}
        ></motion.div>
    );
}
