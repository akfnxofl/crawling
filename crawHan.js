const axios = require('axios');
const fs = require('fs');

const reg = /[~`!@#$%^&*()\-_=+[\]{}|;:'",.<>/?]/g;
const han = /[^ㄱ-힝]/g;

let html;
let hanguelArr = [];
let format;

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

getHTML()
  .then(() => {
    format = html.replace(/\n/g, '');
    format = format.replace(reg, '');
    format = format.replace(han, ' ');
    format = format.split(' ');
    console.log(format);
    for (let i = 0; i < format.length; i++) {
      if (format[i].length > 5) {
        continue;
      } else {
        if (!(hanguelArr.includes(format[i]))) {
          hanguelArr.push(format[i]);
        }
      }
    }
    hanguelArr.shift();
    fs.writeFileSync('hanlist.json', JSON.stringify(hanguelArr, null, 2));
    console.log(hanguelArr);
    console.log(`insert word: ${hanguelArr.length}`);
  });

