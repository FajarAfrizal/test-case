// assignment.js

function reverseAlphabet(inputString) {
    let alphabets = inputString.match(/[a-zA-Z]+/g).join('');
    let digits = inputString.match(/\d+/g).join('');
    let reversedAlphabets = alphabets.split('').reverse().join('');
    return reversedAlphabets + digits;
}

function longest(sentence) {
    let words = sentence.split(' ');
    let longestWord = words.reduce((a, b) => a.length >= b.length ? a : b);
    return `${longestWord}: ${longestWord.length} character`;
}

function countOccurrences(inputArray, queryArray) {
    return queryArray.map(query => inputArray.filter(item => item === query).length);
}




let inputString = "NEGIE1";
console.log(reverseAlphabet(inputString));  

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(longest(sentence));  

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
console.log(countOccurrences(INPUT, QUERY));  


