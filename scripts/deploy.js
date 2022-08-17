async function main() {
    const DefiniteToken = await ethers.getContractFactory("DefiniteToken");
 
    // Start deployment, returning a promise that resolves to a contract object
    const definite_token = await DefiniteToken.deploy();   
    console.log("Contract deployed to address:", definite_token.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });