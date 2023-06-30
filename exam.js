const axios = require('axios');
const natural = require('natural');
const fs = require('fs');
const tokenizer = new natural.WordTokenizer();


const reg = /[\{\}\[\]\/?.,;:|\)\*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
const eng = /[^a-zA-Z]+/g;

let wordCount = 0;
let duplicateNum = 0;
let html;
let wordArr = [];

async function getHTML() {
  try {
    res = await axios.get('https://www.naver.com');
    html = res.data;
    return html;
  } catch (err) {
    console.log(err);
    return;
  }
}

let format;

getHTML()
  .then(() => {
    format = html.replace(/\n/g, ' ');
    format = format.replace(reg, ' ');
    format = format.replace(eng, ' ');
    let tokens = tokenizer.tokenize(format);
    // console.log(tokens);
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].length > 5) {
        continue;
      } else {
        if (wordArr.includes(tokens[i])) {
          duplicateNum++;
        } else {
          wordArr.push(tokens[i]);
          wordCount++;
        }
      }
    }
    fs.writeFileSync('wordlist.json', JSON.stringify(wordArr));
    console.log(wordArr);
    console.log(`wordNum: ${wordCount}`);
    console.log(`not insert wordNum: ${duplicateNum}`);
  });




