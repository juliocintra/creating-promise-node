const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

const fileContent = fs.readFileSync(__filename);

console.log('fileContent', fileContent);
console.log('test 1');

// fs.readFile(__filename, (err, data) => {
//     console.log('async fileContent', data);
// })

readFilePromise(__filename).then(fileData => console.log(fileData));

console.log('test 2');
console.log('test 2');
console.log('test 2');
console.log('test 2');
console.log('test 2');

const fileContent2 = fs.readFileSync(__filename);

console.log('fileContent2', fileContent2);