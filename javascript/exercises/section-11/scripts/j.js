function addNum(array1, array2) {
    let result = []
    for (let i = 0; i < array1.length; i++) {
        result.push(array1[i]+array2[i]);
    }
    return result;
}
console.log(addNum([1, 1, 2], [1, 1, 3]));
console.log(addNum([1, 2, 3], [4, 5, 6]));