function countWords(words) {
    const wordFreq = {};
    for (let i = 0; i < words.length; i++) {
        if (wordFreq[words[i]]) {
            wordFreq[words[i]]++;
        } else {
            wordFreq[words[i]] = 1;
        }
    }
    return wordFreq;
}

console.log(countWords(['apple', 'grape', 'apple', 'apple']));