import fetch from 'node-fetch';
import fs from "fs"

const payload = {
  username: 'root',
  password: 'myPassword',
  Login: 'Login'
};

fetch('http://192.168.56.101/admin/', {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error(error))