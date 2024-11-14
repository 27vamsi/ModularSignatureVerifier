async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const SignatureVerifier = await ethers.getContractFactory("SignatureVerifier");
  
    const verifier = await SignatureVerifier.deploy();
  
    await verifier.deployed();
  
    console.log("SignatureVerifier deployed to:", verifier.address);
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error deploying the contract:", error);
        process.exit(1);
    });
