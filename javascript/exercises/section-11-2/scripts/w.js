function findIndex(array, word) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === word) {
            return i;
        }
    }
    return -1;
}

function unique(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (findIndex(result, array[i]) == -1) {
            result.push(array[i]);
        }
    }
    return result;
}
console.log(unique(['green', 'red', 'blue', 'red']));
console.log(unique(['red', 'green', 'green', 'red']));