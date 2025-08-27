function countPositive(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] >= 0) {
            count++;
        }
    }
    return count;
}
console.log(countPositive([1, -3, 5]));
console.log(countPositive([-2, 3, -5, 7, 10]));