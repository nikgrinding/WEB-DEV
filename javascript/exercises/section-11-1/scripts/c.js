function arraySwap(array) {
    const result = array;
    const temp = result[result.length - 1]
    result[result.length - 1] = result[0]
    result[0] = temp;
    return result;
}
console.log(arraySwap([1, 20, 22, 24, 5]));
console.log(arraySwap(["hi", "hello", "good"]));