const han = require('./hanlist.json');
const eng = require('./englist.json');
const fs = require('fs');

const wordArr = han.concat(eng);
fs.writeFileSync('word.json', JSON.stringify(wordArr, null, 2));

console.log(wordArr);
console.log(`insert word: ${wordArr.length}`);