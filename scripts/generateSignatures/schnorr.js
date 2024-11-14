const elliptic = require("elliptic");
const crypto = require("crypto");

const ec = new elliptic.ec("secp256k1");

async function generateSchnorrSignature() {
    const message = "This is a test message";

    const privateKey = crypto.randomBytes(32);

    const messageHash = crypto.createHash("sha256").update(message).digest();

    const keyPair = ec.keyFromPrivate(privateKey);
    const publicKey = keyPair.getPublic(true, "hex");

    const sig = keyPair.sign(messageHash);

    console.log("Message:", message);
    console.log("Message Hash:", messageHash.toString("hex"));
    console.log("Public Key:", publicKey);
    console.log("Schnorr Signature:", sig.toDER("hex"));
}

generateSchnorrSignature();
