import { PatchData } from '../reducer/types';

export const patchesData: PatchData[] = [
    {
        id: '0_0',
        svg: 'M 0 0 L 5 0 L 5 5 L 5 10 L 0 10 L 0 0',
        width: 5,
        height: 10,
        pattern: '',
        color: '#ff0000', //Červená
        price: 2,
        time: 1,
        income: 0,
        filled: [[1], [1]]
    },
    {
        id: '0_1',
        svg: 'M 0 0 L 5 0 L 5 5 L 10 5 L 10 10 L 0 10 L 0 0',
        width: 10,
        height: 10,
        pattern: '',
        color: '#00ff00', //Zelená
        price: 4,
        time: 6,
        income: 2,
        filled: [
            [1, 0],
            [1, 1]
        ]
    },
    {
        id: '0_2',
        svg: 'M 5 0 L 10 0 L 10 10 L 15 10 L 15 15 L 10 15 L 10 25 L 5 25 L 5 15 L 0 15 L 0 10 L 5 10 L 5 0',
        width: 15,
        height: 25,
        pattern: '',
        color: '#0000ff', //Modrá
        price: 1,
        time: 4,
        income: 1,
        filled: [
            [0, 2, 0],
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ]
    },
    {
        id: '0_3',
        svg: 'm 0 0 L 10 0 L 10 15 L 20 15 L 15 20 L 5 20 L 5 5 L 0 5 L 0 0',
        width: 15,
        height: 20,
        pattern: '',
        color: '#ffff00', //Žlutá
        price: 1,
        time: 2,
        income: 0,
        filled: [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ]
    },
    {
        id: '0_4',
        svg: 'm 0 0 L 5 0 L 5 10 L 10 10 L 10 20 L 0 20 L 0 0',
        width: 10,
        height: 20,
        pattern: '',
        color: '#ff00ff', // Purpurová
        price: 10,
        time: 5,
        income: 3,
        filled: [
            [2, 0],
            [2, 0],
            [2, 1],
            [1, 1]
        ]
    },
    {
        id: '0_5',
        svg: 'm 0 0 L 5 0 L 5 5 L 10 5 L 10 0 L 15 0 L 15 15 L 10 15 L 10 10 L 5 10 L 5 15 L 0 15 L 0 0',
        width: 15,
        height: 15,
        pattern: '',
        color: '#00ffff', // Azurová
        price: 2,
        time: 3,
        income: 0,
        filled: [
            [1, 0, 1],
            [1, 1, 1],
            [1, 0, 1]
        ]
    },
    {
        id: '0_6',
        svg: 'm 0 0 L 5 0 L 5 5 L 10 5 L 10 0 L 15 0 L 15 10 L 10 10 L 10 15 L 5 15 L 5 10 L 0 10 L 0 0',
        width: 15,
        height: 15,
        pattern: '',
        color: '#f0f0f0', // Světle šedá
        price: 3,
        time: 6,
        income: 2,
        filled: [
            [2, 0, 2],
            [1, 1, 1],
            [0, 1, 0]
        ]
    },
    {
        id: '0_7',
        svg: 'm 0 0 L 10 0 L 10 10 L 0 10 L 0 0',
        width: 10,
        height: 10,
        pattern: '',
        color: '#1a1a1a', // Tmavě šedá
        price: 6,
        time: 5,
        income: 2,
        filled: [
            [2, 2],
            [1, 1]
        ]
    },
    {
        id: '0_8',
        svg: 'm 5 0 L 10 0 L 10 5 L 15 5 L 15 15 L 10 15 L 10 20 L 5 20 L 5 15 L 0 15 L 0 5 L 5 5 L 5 0',
        width: 15,
        height: 20,
        pattern: '',
        color: '#990000', //Tmavě červená
        price: 5,
        time: 3,
        income: 1,
        filled: [
            [0, 2, 0],
            [1, 1, 1],
            [1, 1, 1],
            [0, 1, 0]
        ]
    },
    {
        id: '1_0',
        svg: 'M 5 0 L 10 0 L 10 15 L 15 15 L 15 20 L 0 20 L 0 15 L 5 15 L 5 0',
        width: 15,
        height: 20,
        pattern: '',
        color: '#009900', //Tmavě zelená
        price: 7,
        time: 2,
        income: 2,
        filled: [
            [0, 2, 0],
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1]
        ]
    },
    {
        id: '1_1',
        svg: 'M 5 0 L 15 0 L 15 5 L 10 5 L 10 15 L 0 15 L 0 5 L 5 5 L 5 0',
        width: 15,
        height: 15,
        pattern: '',
        color: '#000099', //Tmavě modrá
        price: 8,
        time: 6,
        income: 2,
        filled: [
            [0, 2, 2],
            [1, 2, 0],
            [1, 1, 0]
        ]
    },
    {
        id: '1_2',
        svg: 'M 5 0 L 10 0 L 10 15 L 5 15 L 5 20 L 0 20 L 0 5 L 5 5 L 5 0',
        width: 10,
        height: 20,
        pattern: '',
        color: '#999900', //Olivová
        price: 4,
        time: 2,
        income: 0,
        filled: [
            [0, 1],
            [1, 1],
            [1, 1],
            [1, 0]
        ]
    },
    {
        id: '1_3',
        svg: 'M 5 0 L 10 0 L 10 5 L 15 5 L 15 5 L 15 10 L 10 10 L 10 20 L 5 20 L 5 15 L 0 15 L 0 10 L 5 10 L 5 0',
        width: 15,
        height: 20,
        pattern: '',
        color: '#990099', //Tmavě purpurová
        price: 2,
        time: 1,
        income: 0,
        filled: [
            [0, 1, 0],
            [0, 1, 1],
            [1, 1, 0],
            [0, 1, 0]
        ]
    },
    {
        id: '1_4',
        svg: 'M 0 0 L 5 0 L 5 5 L 10 5 L 10 10 L 15 10 L 15 15 L 5 15 L 5 10 L 0 10 L 0 0 L 0 0',
        width: 15,
        height: 15,
        pattern: '',
        color: '#009999', //Tmavě azurová
        price: 10,
        time: 4,
        income: 3,
        filled: [
            [2, 0, 0],
            [2, 2, 0],
            [0, 1, 1]
        ]
    },
    {
        id: '1_5',
        svg: 'M 5 0 L 10 0 L 10 20 L 5 20 L 5 15 L 0 15 L 0 5 L 5 5 L 5 0',
        width: 10,
        height: 20,
        pattern: '',
        color: '#99cccc', //Šedomodrá
        price: 7,
        time: 4,
        income: 2,
        filled: [
            [0, 2],
            [1, 2],
            [1, 1],
            [0, 1]
        ]
    },
    {
        id: '1_6',
        svg: 'M 0 0 L 5 0 L 5 10 L 10 10 L 10 15 L 5 15 L 5 20 L 0 20 L 0 0',
        width: 10,
        height: 20,
        pattern: '',
        color: '#333333', //Černá
        price: 3,
        time: 4,
        income: 1,
        filled: [
            [2, 0],
            [1, 0],
            [1, 1],
            [1, 0]
        ]
    },
    {
        id: '1_7',
        svg: 'M 5 0 L 10 0 L 10 10 L 15 10 L 15 15 L 0 15 L 0 10 L 5 10 L 5 0',
        width: 15,
        height: 15,
        pattern: '',
        color: '#cc0000', //Sytě červená
        price: 5,
        time: 5,
        income: 2,
        filled: [
            [0, 2, 0],
            [0, 2, 0],
            [1, 1, 1]
        ]
    },
    {
        id: '2_0',
        svg: 'M 0 0 L 10 0 L 10 5 L 5 5 L 5 10 L 10 10 L 10 15 L 0 15 L 0 0',
        width: 10,
        height: 15,
        pattern: '',
        color: '#00cc00', //Sytě zelená
        price: 1,
        time: 2,
        income: 0,
        filled: [
            [1, 1],
            [1, 0],
            [1, 1]
        ]
    },
    {
        id: '2_1',
        svg: 'M 0 0 L 5 0 L 5 5 L 5 10 L 10 10 L 10 15 L 5 15 L 0 15 L 0 0',
        width: 10,
        height: 15,
        pattern: '',
        color: '#0000CC', //Sytě modrá
        price: 4,
        time: 2,
        income: 1,
        filled: [
            [2, 0],
            [1, 0],
            [1, 1]
        ]
    },
    {
        id: '2_2',
        svg: 'M 0 0 L 5 0 L 5 5 L 5 10 L 10 10 L 10 15 L 5 15 L 0 15 L 0 0',
        width: 10,
        height: 15,
        pattern: '',
        color: '#CCCC00', //Sytě žlutá
        price: 4,
        time: 6,
        income: 2,
        filled: [
            [2, 0],
            [1, 0],
            [1, 2]
        ]
    },
    {
        id: '2_3',
        svg: 'M 0 0 L 5 0 L 5 5 L 5 15 L 10 15 L 10 20 L 5 20 L 0 20 L 0 0',
        width: 10,
        height: 20,
        pattern: '',
        color: '#CC00CC', //Sytě purporuvá
        price: 10,
        time: 3,
        income: 2,
        filled: [
            [2, 0],
            [2, 0],
            [1, 0],
            [1, 1]
        ]
    },
    {
        id: '2_4',
        svg: 'M 5 0 L 10 0 L 10 15 L 5 15 L 5 20 L 0 20 L 0 10 L 5 10 L 5 0',
        width: 10,
        height: 20,
        pattern: '',
        color: '#00CCCC', //Sytě tyrkysová
        price: 2,
        time: 3,
        income: 1,
        filled: [
            [0, 1],
            [0, 2],
            [1, 1],
            [1, 0]
        ]
    },
    {
        id: '2_5',
        svg: 'M 0 0 L 5 0 L 5 15 L 0 15 L 0 0',
        width: 5,
        height: 15,
        pattern: '',
        color: '#666666', //Středně šedá
        price: 2,
        time: 3,
        income: 1,
        filled: [[1], [1], [1]]
    },
    {
        id: '2_6',
        svg: 'M 0 0 L 5 0 L 5 25 L 0 25 L 0 0',
        width: 5,
        height: 25,
        pattern: '',
        color: '#4D4D4D', //Středně tmavě šedá
        price: 7,
        time: 1,
        income: 1,
        filled: [[1], [1], [2], [1], [1]]
    },
    {
        id: '2_7',
        svg: 'M 5 0 L 10 0 L 10 10 L 15 10 L 15 15 L 10 15 L 10 20 L 5 20 L 5 15 L 0 15 L 0 10 L 5 10 L 5 0',
        width: 15,
        height: 20,
        pattern: '',
        color: '#CC6600', //Hnědá
        price: 0,
        time: 3,
        income: 1,
        filled: [
            [0, 2, 0],
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    },
    {
        id: '3_0',
        svg: 'M 0 0 L 5 0 L 5 5 L 10 5 L 10 10 L 0 10 L 0 0',
        width: 10,
        height: 10,
        pattern: '',
        color: '#006600', //Tmavě zelená
        price: 1,
        time: 3,
        income: 0,
        filled: [
            [1, 0],
            [1, 1]
        ]
    },
    {
        id: '3_1',
        svg: 'M 5 0 L 10 0 L 10 5 L 15 5 L 15 10 L 10 10 L 10 15 L 5 15 L 5 10 L 0 10 L 0 5 L 5 5 L 5 0',
        width: 15,
        height: 15,
        pattern: '',
        color: '#000066', //Tmavě modrá
        price: 5,
        time: 4,
        income: 2,
        filled: [
            [0, 2, 0],
            [1, 1, 2],
            [0, 1, 0]
        ]
    },
    {
        id: '3_2',
        svg: 'M 0 0 L 5 0 L 5 5 L 10 5 L 10 10 L 5 10 L 5 15 L 0 15 L 0 0',
        width: 10,
        height: 15,
        pattern: '',
        color: '#666600', //Tmavě olivová
        price: 2,
        time: 2,
        income: 0,
        filled: [
            [1, 0],
            [1, 1],
            [1, 0]
        ]
    },
    {
        id: '3_3',
        svg: 'M 0 0 L 5 0 L 5 5 L 10 5 L 10 15 L 0 15 L 0 0',
        width: 10,
        height: 15,
        pattern: '',
        color: '#660066', //Tmavě fialová
        price: 2,
        time: 2,
        income: 0,
        filled: [
            [1, 0],
            [1, 1],
            [1, 1]
        ]
    },
    {
        id: '3_4',
        svg: 'M 0 0 L 10 0 L 10 5 L 5 5 L 5 15 L 10 15 L 10 20 L 0 20 L 0 15 L 0 0',
        width: 10,
        height: 20,
        pattern: '',
        color: '#006666', //Tmavě azurová
        price: 1,
        time: 5,
        income: 1,
        filled: [
            [1, 1],
            [1, 0],
            [1, 0],
            [2, 1]
        ]
    },
    {
        id: '3_5',
        svg: 'M 0 0 L 5 0 L 5 20 L 0 20 L 0 0',
        width: 5,
        height: 20,
        pattern: '',
        color: '#999999', //Střední světlá šedá
        price: 3,
        time: 3,
        income: 1,
        filled: [[1], [1], [1], [2]]
    },
    {
        id: '3_6',
        svg: 'M 0 0 L 5 0 L 5 5 L 10 5 L 10 15 L 10 15 L 5 15 L 5 10 L 0 10 L 0 0 L 0 0',
        width: 10,
        height: 15,
        pattern: '',
        color: '#262626', //Tmavě šedá
        price: 3,
        time: 2,
        income: 1,
        filled: [
            [2, 0],
            [1, 1],
            [0, 1]
        ]
    },
    {
        id: '3_7',
        svg: 'M 0 0 L 5 0 L 5 5 L 10 5 L 10 15 L 10 15 L 5 15 L 5 10 L 0 10 L 0 0 L 0 0',
        width: 10,
        height: 15,
        pattern: '',
        color: '#FF6600', //Oranžová
        price: 7,
        time: 6,
        income: 3,
        filled: [
            [2, 0],
            [2, 2],
            [0, 1]
        ]
    }
];
