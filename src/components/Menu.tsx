import { faArrowRotateLeft, faArrowRotateRight, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Action } from '../reducer/reducer';
import { DraggedData } from '../reducer/types';

export type MenuProps = {
    data: DraggedData | null;
    dispatch: React.Dispatch<Action>;
};

export function Menu({ data, dispatch }: MenuProps) {
    return (
        <div>
            <div className="flex flex-row">
                <button
                    className="px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                    onClick={() => dispatch({ type: 'ROTATE_LEFT' })}
                    disabled={!data}
                >
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                </button>
                <button
                    className="px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                    disabled={!data}
                    onClick={() => dispatch({ type: 'FLIP' })}
                >
                    <FontAwesomeIcon icon={faRepeat} />
                </button>
                <button
                    className="px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                    onClick={() => dispatch({ type: 'ROTATE_RIGHT' })}
                    disabled={!data}
                >
                    <FontAwesomeIcon icon={faArrowRotateRight} />
                </button>
            </div>
            <button
                className="w-full px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                onClick={() => dispatch({ type: 'PLACE' })}
                disabled={!data?.onBlanket}
            >
                Umístit
            </button>
        </div>
    );
}
