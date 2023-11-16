export type BlanketProps = {};

export function Blanket({}: BlanketProps) {
    const cells = [];
    for (let i = 0; i < 81; i++) {
        cells.push(<div className="aspect-square outline outline-1 outline-gray-500"></div>);
    }

    return (
        <div
            className="grid grid-cols-9 aspect-square grid-rows-9"
            style={{ width: '180px', backgroundColor: ' #506d84' }}
        ></div>
    );
}

// .GamePage__player1 {
//     aspect-ratio: 1 / 1;
//     background-color: #506d84;
//     width: 180px;
//     display: grid;
//     grid-gap: 0;
//     grid-auto-rows: 20px;
//     grid-template-columns: repeat(9, 20px);
// }

// .GamePage__playerBoards {
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
// }
