const moment = require('moment');

let date = moment();

date.add(1, 'years').subtract(9, 'months')

console.log(date.format('DD.MM.YYYY, H:mm:ss'));
console.log(date.format('DD.MM.YYYY, h:mm a'));