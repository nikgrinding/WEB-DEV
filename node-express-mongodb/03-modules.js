const names = require("./04-names");
const sayHi = require("./05-utils");
const data = require("./06-alternative-flavour");
console.log(data);

const { prem, ramana } = names;

sayHi("nik");
sayHi(prem);
sayHi(ramana);

require("./07-mind-grenade");
