const assert = require('assert');
const add = require('../add');

describe("add function", () => {
    it("should add even numbers", () => {
        assert(add(2,2) === 4);
    });

    it("should add odd numbers", () => {
        assert(add(1,3) === 4);
    });
});