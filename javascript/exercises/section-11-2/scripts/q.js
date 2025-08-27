function findIndex(array, word) {
    let flag = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === word) {
            flag = true;
            console.log(i);
            break;
        }
    }
    if (!flag) {
        console.log(-1);
    }
}
findIndex(['green', 'red', 'blue', 'red'], 'red');
findIndex(['green', 'red', 'blue', 'red'], 'yellow');