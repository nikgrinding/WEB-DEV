function search(array) {
    let flag = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 'search') {
            flag = true;
            console.log(i);
        }
    }
    if (!flag) {
        console.log(-1);
    }
}
search(['hello', 'world', 'search', 'good']);
search(['not', 'found']);