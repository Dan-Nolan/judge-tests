const Mocha = require("mocha");
const mocha = new Mocha();
mocha.addFile("./test/test.js");
mocha.run();