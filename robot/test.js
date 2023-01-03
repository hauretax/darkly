import fetch from 'node-fetch';
import fs from "fs"

// etch('http://192.168.56.101/.hidden/zzfzjvjsupgzinctxeqtzzdzll/zcgkxuyzzplsfnisngzlayvgee/xhytouigdvshzvldngdskfmkpf/')



const url = 'http://192.168.56.101/.hidden/'

function getStringBetween(str, start, end) {
    const result = str.match(new RegExp(start + "(.*)" + end));

    return result[1];
}

const options = {
};
fetch(url,)
    .then(res => res.text())
    .then(text => {
        // console.log(text)
        // var mySubString = text.split(/[=>]/);
        var mySubString = getStringBetween(text, "<a href=", "/\">");
        console.log(mySubString)
    });
  