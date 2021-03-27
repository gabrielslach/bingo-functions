const cardObj = (id = -1, cells = [[]]) => ({
    id,
    cells
});

const bingo = [
        [1,15],
        [16, 30],
        [31,45],
        [46,60],
        [61,75],
    ]

const createCard = () => {
    const cells = [];

    bingo.forEach(item=> {
        const rangeStart = item[0];
        const rangeEnd = item[1] + 1;
        const numberArr = [];

        for (let i = 0; i < 5; i++) {
            let randomInt;

            do {
                const randomFloat = Math.random();
                randomInt = Math.floor(randomFloat * (rangeEnd - rangeStart)) + rangeStart;
            } while(numberArr.includes(randomInt));

            numberArr.push(randomInt);
        }

        cells.push(numberArr);
    });

    const transposedCells = [[],[],[],[],[]];

    cells.forEach((row, r_index) => {
        row.forEach((cell_val, c_index) => {
            if (r_index === 2 && c_index === 2) {
                transposedCells[c_index].push('');
            } else {
                transposedCells[c_index].push(cell_val);
            };
        });
    });

    // const transposedCells = [];

    // cells.forEach((row, r_index) => {
    //     let t_row = '';
    //     row.forEach((cell_val, c_index) => {
    //         if (r_index === 2 && c_index === 2) {
    //             t_row += ',';
    //         } else {
    //             t_row +=  cell_val + ',';
    //         };
    //     });
    //     transposedCells.push(t_row);
    // });

    return cardObj(
        parseInt(Math.random() * 1000), 
        JSON.stringify(transposedCells)
        );
}


module.exports = createCard;