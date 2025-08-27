function search(array) {
    let flag = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 'search') {
            flag = true;
            console.log(i);
            break;
        }
    }
    if (!flag) {
        console.log(-1);
    }
}
search(['hello', 'world', 'search', 'good', 'search']);
search(['not', 'found']);