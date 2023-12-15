import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { buttonIconData } from '../data/buttonSvgData';
import { Action } from '../reducer/reducer';
import { PlayerType } from '../reducer/types';

export type PlayerHeadProps = {
    playerName: string;
    buttons: number;
    buttonsAnimation: number[];
    size: number;
    playerId: PlayerType;
    dispatch: React.Dispatch<Action>;
};

export function PlayerHead({ playerName, buttons, buttonsAnimation, size, playerId, dispatch }: PlayerHeadProps) {
    const controlOriginal = useAnimation();
    const controlNew = useAnimation();
    const [oldButtons, setNewButtons] = useState(5);

    useEffect(() => {
        setTimeout(() => {
            setNewButtons(buttons);
        }, 2000);
    }, [buttons]);

    useEffect(() => {
        controlNew.set({ opacity: 0 });
        controlNew.start({
            opacity: 1,
            transition: { delay: 1, duration: 0.5 }
        });
        controlOriginal.set({ opacity: 1 });
        controlOriginal.start({
            opacity: 0,
            transition: { delay: 1.5, duration: 0.5 }
        });
    }, [buttons, controlNew, controlOriginal]);

    return (
        <div className="absolute z-10 text-center bottom-full" style={{ width: `${size * 9}px` }}>
            <span className="font-semibold">{playerName}</span>{' '}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 5 5"
                className="inline-block pl-1 mb-1 text-blue-800"
                style={{
                    height: '1em',
                    lineHeight: '1em'
                }}
            >
                <path d={buttonIconData} fill="rgb(30 64 175)" />
            </svg>
            <span className="relative">
                <motion.span className="absolute left-1" animate={controlOriginal}>
                    {oldButtons}
                </motion.span>
                <motion.span className="absolute left-1" animate={controlNew}>
                    {buttons}
                </motion.span>
            </span>
            <span className="relative invisible inline">
                <span className="absolute bottom-0 text-left left-4 w-36">
                    {buttonsAnimation.map((value, index) => (
                        <motion.div
                            key={index}
                            className="absolute bottom-0 left-0 visible"
                            style={{ left: `${index}em` }}
                            initial={{ opacity: 1, fontSize: '1em' }}
                            animate={{ opacity: 0, fontSize: '2em' }}
                            transition={{ delay: 1, duration: 2 }}
                            onAnimationComplete={() => {
                                dispatch({ type: 'SCORE_ANIMATION_END', payload: { player: playerId, value } });
                            }}
                        >
                            {(value >= 0 ? '+' : '') + value}
                        </motion.div>
                    ))}
                </span>
            </span>
        </div>
    );
}
