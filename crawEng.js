const axios = require('axios');
const natural = require('natural');
const fs = require('fs');
const tokenizer = new natural.WordTokenizer();

const reg = /[~`!@#$%^&*()\-_=+[\]{}|;:'",.<>/?]/g;
const eng = /[^a-zA-Z]+/g;

let html;
let englishArr = [];
let format;


async function getHTML() {
  try {
    res = await axios.get('https://www.google.com');
    html = res.data;
    return html;
  } catch (err) {
    console.log(err);
    return;
  }
}


getHTML()
  .then(() => {
    format = html.replace(/\n/g, '');
    format = format.replace(reg, ' ');
    format = format.replace(eng, ' ');
    let tokens = tokenizer.tokenize(format);
    // console.log(tokens);
    // fs.writeFileSync('ex.json', JSON.stringify(tokens, null, 2));
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].length > 5) {
        continue;
      } else {
        if (!(englishArr.includes(tokens[i]))) {
          englishArr.push(tokens[i]);
        }
      }
    }
    fs.writeFileSync('englist.json', JSON.stringify(englishArr, null, 2));
    console.log(englishArr);
    console.log(`insert word: ${englishArr.length}`);
  });