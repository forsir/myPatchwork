import { faArrowRotateLeft, faArrowRotateRight, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Action } from '../reducer/reducer';
import { Button } from './Button';

export type MenuProps = {
    dispatch: React.Dispatch<Action>;
};

export function Menu({ dispatch }: MenuProps) {
    return (
        <div>
            <div className="flex flex-row">
                <Button
                    text={<FontAwesomeIcon icon={faArrowRotateLeft} />}
                    action={() => dispatch({ type: 'ROTATE_LEFT' })}
                />
                <Button text={<FontAwesomeIcon icon={faRepeat} />} action={() => dispatch({ type: 'FLIP' })} />
                <Button
                    text={<FontAwesomeIcon icon={faArrowRotateRight} />}
                    action={() => dispatch({ type: 'ROTATE_RIGHT' })}
                />
            </div>
            <Button text="Umístit" action={() => dispatch({ type: 'PLACE' })} />
        </div>
    );
}
