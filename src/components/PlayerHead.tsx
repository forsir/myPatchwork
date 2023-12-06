import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
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
    return (
        <div className="absolute z-10 text-center bottom-full" style={{ width: `${size * 9}px` }}>
            <span className="font-semibold">{playerName}</span>{' '}
            <FontAwesomeIcon icon={faCircleDot} className="text-xs opacity-50" /> {buttons}
            <span className="relative invisible inline">
                &nbsp;
                <span className="absolute bottom-0 left-0 text-left w-36">
                    {buttonsAnimation.map((value, index) => (
                        <span key={index} className="relative invisible">
                            <motion.div
                                key={index}
                                className="absolute bottom-0 left-0 visible"
                                initial={{ opacity: 1, fontSize: '1em' }}
                                animate={{ opacity: 0, fontSize: '2em' }}
                                transition={{ delay: 1, duration: 2 }}
                                onAnimationComplete={() => {
                                    dispatch({ type: 'ANIMATION_END', payload: { player: playerId, index } });
                                }}
                            >
                                {(value >= 0 ? '+' : '') + value}
                            </motion.div>
                            {(value >= 0 ? '+' : '') + value}
                        </span>
                    ))}
                </span>
            </span>
        </div>
    );
}
