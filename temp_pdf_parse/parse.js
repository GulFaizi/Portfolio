const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('G:\\Projects\\Portfolio\\client\\src\\assets\\Gul Ahmad Faizi Resume.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => console.error(err));
