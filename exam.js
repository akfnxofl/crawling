const axios = require('axios');

let html;
let htmlArr = [];
let arr = [];
let wordArr = [];

async function getHTML() {
  try {
    const res = await axios.get('https://www.naver.com');
    html = res.data;
    htmlArr = String(html).split('');
  } catch (err) {
    console.log(err);
  }
}

getHTML()
  .then(() => {
    console.log(htmlArr.length);
    let str = '';
    for (let i = 0; i < htmlArr.length; i++) {
      if (!((htmlArr[i] >= 'A' && htmlArr[i] <= 'Z') || (htmlArr[i] >= 'a' && htmlArr[i] <= 'z'))) {
        if (str !== '') {
          arr.push(str);
          str = '';
        } else {
          continue;
        }
      } else {
        str += htmlArr[i];
      }
    }
  

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length < 5) {
        continue;
      } else {
        wordArr.push(arr[i]);
      }
    }
    console.log(wordArr);
    console.log(wordArr.length);
  });