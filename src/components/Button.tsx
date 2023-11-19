export type ButtonProperty = {
    text: string | JSX.Element;
    action: () => void;
};

export function Button({ text, action }: ButtonProperty) {
    const onClickHandle = () => {
        action();
    };

    return (
        <div
            onClick={onClickHandle}
            className="px-4 py-2 m-1 font-bold text-center text-black bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer"
        >
            {text}
        </div>
    );
}
