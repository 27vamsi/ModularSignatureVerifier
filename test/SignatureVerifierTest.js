const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SignatureVerifier", function () {
    it("Should verify an ECDSA signature", async function () {
        const [signer] = await ethers.getSigners();
        const SignatureVerifier = await ethers.getContractFactory("SignatureVerifier");
        const signatureVerifier = await SignatureVerifier.deploy();
        await signatureVerifier.deployed();

        const message = "This is a test message";
        const messageHash = ethers.utils.hashMessage(message);
        const signature = await signer.signMessage(ethers.utils.arrayify(messageHash));

        const result = await signatureVerifier.verifySignature(signer.address, signature, messageHash, "ecdsa");
        expect(result).to.be.true;
    });
});
