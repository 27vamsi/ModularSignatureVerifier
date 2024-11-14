const ethers = require("ethers");
const prompt = require("prompt-sync")();
const crypto = require("crypto");
const elliptic = require("elliptic");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY; 
const wallet = new ethers.Wallet(privateKey);

function signMessageRSA(message, privateKey) {
  const sign = crypto.createSign("RSA-SHA256"); 
  sign.update(message);
  sign.end();

  const privateKeyBuffer = Buffer.from(privateKey, "hex");

  try {
    const rsaSignature = sign.sign(
      { key: privateKeyBuffer, padding: crypto.constants.RSA_PKCS1_PSS_PADDING },
      "hex"
    );
    console.log("Generated RSA Signature:", rsaSignature);
    return rsaSignature;
  } catch (error) {
    console.error("Error generating RSA signature:", error.message);
  }
}

function signMessageSchnorr(message, privateKey) {
  const secp256k1 = new elliptic.ec("secp256k1");

  const key = secp256k1.keyFromPrivate(privateKey, "hex");

  const msgHash = ethers.utils.id(message);  

  const k = secp256k1.genKeyPair();  

  const r = k.getPublic().encode("hex");  

  const privateKeyBigInt = BigInt(privateKey);
  const s = k.getPrivate().sub(privateKeyBigInt * BigInt(r)).mod(secp256k1.n); 

  const schnorrSignature = Buffer.concat([Buffer.from(r, "hex"), Buffer.from(s.toString(16), "hex")]);

  console.log("Generated Schnorr Signature:", schnorrSignature.toString("hex"));
  return schnorrSignature.toString("hex");
}

async function signMessage() {
  const message = prompt("Enter message to sign: ");
  const signatureScheme = prompt("Enter signature scheme (ecdsa/rsa/schnorr): ").toLowerCase();

  let signature;
  
  switch (signatureScheme) {
    case "ecdsa":
      const messageHash = ethers.utils.id(message); 
      signature = await wallet.signMessage(message); 
      console.log("Generated ECDSA Signature:", signature);
      break;
    
    case "rsa":
      signature = signMessageRSA(message, privateKey);
      break;
      
    case "schnorr":
      signature = signMessageSchnorr(message, privateKey);
      break;
      
    default:
      console.log("Unsupported signature scheme. Please choose ecdsa, rsa, or schnorr.");
      return;
  }

  console.log(`Generated ${signatureScheme.toUpperCase()} Signature:`, signature);
}

signMessage();
