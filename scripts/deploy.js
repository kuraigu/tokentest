async function main() {
    const DefiniteNFT = await ethers.getContractFactory("DefiniteNFT");
 
    // Start deployment, returning a promise that resolves to a contract object
    const definite_nft = await DefiniteNFT.deploy();   
    console.log("Contract deployed to address:", definite_nft.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });