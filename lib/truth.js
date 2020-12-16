const fs = require('fs');

module.exports = () => {
    const data = fs.readFileSync('./lib/tod.json');
    const jsonData = JSON.parse(data);
    const randIndex = Math.floor(Math.random() * jsonData.length);
    const randKey = jsonData[randIndex];
    return `*TRUTH* : ${randKey.truth}?`;
};