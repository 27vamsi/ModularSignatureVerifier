const { ethers } = require("ethers");

async function generateECDSASignature() {
    const wallet = ethers.Wallet.createRandom();
    const message = "This is a test message";
    const messageHash = ethers.utils.hashMessage(message);

    const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));
    console.log("Message:", message);
    console.log("Message Hash:", messageHash);
    console.log("Signer Address:", wallet.address);
    console.log("ECDSA Signature:", signature);
}

generateECDSASignature();
