function removeEgg(foods) {
    foods.reverse();
    let count = 2;
    let result = [];
    for (let i = 0; i < foods.length; i++) {
        if (count && foods[i] === 'egg') {
            count--;
            continue;
        }
        result.push(foods[i]);
    }
    result.reverse();
    return result;
}
console.log(removeEgg(['egg', 'apple', 'egg', 'egg', 'ham' ]));