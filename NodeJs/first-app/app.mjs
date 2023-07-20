// app.mjs
import path from 'path';

let result = path.resolve('app.mjs');

result = path.extname('app.mjs')

const pathObj = path.parse('app.mjs')

console.log(pathObj.root);
console.log(pathObj.dir);
// console.log(result.base);
// console.log(result.ext);
// console.log(result.name);
