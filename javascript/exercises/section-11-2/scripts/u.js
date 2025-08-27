function removeEgg(foods) {
    let array = foods.slice();
    array.reverse();
    let count = 2;
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (count && array[i] === 'egg') {
            count--;
            continue;
        }
        result.push(array[i]);
    }
    result.reverse();
    return result;
}
let array = ['egg', 'apple', 'egg', 'egg', 'ham' ];
console.log(removeEgg(array));
console.log(array);