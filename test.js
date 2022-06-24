const assert = require('assert');
const ethers = require('ethers');

describe("wallet", () => {
    let wallet;
    before(() => {
        wallet = ethers.Wallet.createRandom();
    });

    it("should have an address", () => {
        assert(wallet.address);
    });

    it("should have an address", () => {
        assert(wallet.privateKey);
    });

    it("the address should be 40 hex characters long", () => {
        // slice off the 0x
        const address = wallet.address.slice(2);
        assert(address.length === 40);
    });
});