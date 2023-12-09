import { faArrowRotateLeft, faArrowRotateRight, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Action } from '../reducer/reducer';
import { DraggedData } from '../reducer/types';

export type MenuProps = {
    draggedData: DraggedData | null;
    isSmallPatch: boolean;
    dispatch: React.Dispatch<Action>;
};

export function Menu({ draggedData, isSmallPatch, dispatch }: MenuProps) {
    return (
        <div>
            <div className="flex flex-row">
                <button
                    className="flex-1 px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                    onClick={() => dispatch({ type: 'ROTATE_LEFT' })}
                    disabled={!draggedData || isSmallPatch}
                >
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                </button>
                <button
                    className="flex-1 px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                    disabled={!draggedData || isSmallPatch}
                    onClick={() => dispatch({ type: 'FLIP' })}
                >
                    <FontAwesomeIcon icon={faRepeat} />
                </button>
                <button
                    className="flex-1 px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                    onClick={() => dispatch({ type: 'ROTATE_RIGHT' })}
                    disabled={!draggedData || isSmallPatch}
                >
                    <FontAwesomeIcon icon={faArrowRotateRight} />
                </button>
            </div>
            <button
                className="w-full px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                onClick={() => dispatch({ type: 'PLACE' })}
                disabled={!draggedData?.onBlanket || !draggedData?.canBePlaced}
            >
                {isSmallPatch ? 'Umístit látku' : 'Koupit látku'}
            </button>
            <button
                className="w-full px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                onClick={() => dispatch({ type: 'SKIP' })}
                disabled={isSmallPatch}
            >
                Vynechat tah
            </button>
        </div>
    );
}
