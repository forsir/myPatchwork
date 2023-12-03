import { faArrowRotateLeft, faArrowRotateRight, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Action } from '../reducer/reducer';
import { DraggedData } from '../reducer/types';
import { Button } from './Button';

export type MenuProps = {
    data: DraggedData | null;
    dispatch: React.Dispatch<Action>;
};

export function Menu({ data, dispatch }: MenuProps) {
    return (
        <div>
            <div className="flex flex-row">
                <Button
                    text={<FontAwesomeIcon icon={faArrowRotateLeft} />}
                    action={() => dispatch({ type: 'ROTATE_LEFT' })}
                    disabled={!data}
                />
                <Button
                    text={<FontAwesomeIcon icon={faRepeat} />}
                    disabled={!data}
                    action={() => dispatch({ type: 'FLIP' })}
                />
                <Button
                    text={<FontAwesomeIcon icon={faArrowRotateRight} />}
                    action={() => dispatch({ type: 'ROTATE_RIGHT' })}
                    disabled={!data}
                />
            </div>
            <Button text="Umístit" action={() => dispatch({ type: 'PLACE' })} disabled={!data?.onBlanket} />
        </div>
    );
}
