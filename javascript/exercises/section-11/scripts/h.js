function addOne(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result.push(array[i]+1);
    }
    return result;
}

console.log(addOne([1, 2, 3]));
console.log(addOne([-2, -1, 0, 99]));