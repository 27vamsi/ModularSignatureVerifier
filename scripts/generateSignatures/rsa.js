const forge = require("node-forge");

function generateRSASignature() {
    const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
    const message = "This is a test message";
    const md = forge.md.sha256.create();
    md.update(message, "utf8");

    const signature = privateKey.sign(md);
    console.log("Message:", message);
    console.log("Public Key:", forge.pki.publicKeyToPem(publicKey));
    console.log("RSA Signature:", forge.util.bytesToHex(signature));
}

generateRSASignature();
