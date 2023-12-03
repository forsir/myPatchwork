export type ButtonProperty = {
    text: string | JSX.Element;
    action: () => void;
    disabled?: boolean;
};

export function Button({ text, disabled, action }: ButtonProperty) {
    const onClickHandle = () => {
        action();
    };

    return (
        <button
            onClick={onClickHandle}
            className="px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
            disabled={disabled}
        >
            {text}
        </button>
    );
}
