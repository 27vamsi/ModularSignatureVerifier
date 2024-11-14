const ethers = require("ethers");
const prompt = require("prompt-sync")();
require("dotenv").config();

const contractAddress = process.env.CONTRACT_ADDRESS; 
const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "signer", "type": "address" },
      { "internalType": "bytes", "name": "signature", "type": "bytes" },
      { "internalType": "bytes32", "name": "messageHash", "type": "bytes32" },
      { "internalType": "string", "name": "schemeType", "type": "string" }
    ],
    "name": "verifySignature",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const scheme = prompt("Enter signature scheme (ecdsa/rsa/schnorr): ").toLowerCase();
const message = prompt("Enter message to verify: ");
const signature = prompt("Enter the signature to verify: ");
const messageHash = ethers.utils.id(message); 

async function verifySignature() {
  const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  try {
    const recoveredAddress = await ethers.utils.verifyMessage(message, signature);
    console.log("Recovered Address: ", recoveredAddress);

    const isValid = await contract.verifySignature(recoveredAddress, signature, messageHash, scheme);
    console.log("Signature verification result: ", isValid);
  } catch (error) {
    console.error("Error interacting with contract: Invalid signature format or contract verification failed");
    console.log("Signature verification result: false");
  }
}

verifySignature();
