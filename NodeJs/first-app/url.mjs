import url from 'url';

const address = 'http://sadikturan.com/kurslar?year=2019&month=nisan'

let result = url.parse(address, true);

console.log(result)
console.log("path: " + result.path)
console.log("pathname: " + result.pathname)
console.log("year: "+result.query.year)
console.log("month: "+result.query.month)