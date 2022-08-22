/** 
 * @author Innoh Reloza
 * @dev This is a test script for minting multiple NFTs based on different URIs
*/

const contract = require('./contract_details.js');

async function main()
{
    const developersURI = 
    [
        "https://api.jsonbin.io/v3/b/6303a1725c146d63ca7a901e",
        "https://api.jsonbin.io/v3/b/6303a16d5c146d63ca7a9017",
        "https://api.jsonbin.io/v3/b/6303a167a1610e63860a395a",
        "https://api.jsonbin.io/v3/b/6303a160a1610e63860a394c",
        "https://api.jsonbin.io/v3/b/6303a15aa1610e63860a3944",
        "https://api.jsonbin.io/v3/b/6303a151a1610e63860a3939",
        "https://api.jsonbin.io/v3/b/6303a13c5c146d63ca7a8fda",
        "https://api.jsonbin.io/v3/b/6303a136a1610e63860a3916",
        "https://api.jsonbin.io/v3/b/6303a12ae13e6063dc87198a",
        "https://api.jsonbin.io/v3/b/6303a10c5c146d63ca7a8f9c",
        "https://api.jsonbin.io/v3/b/6303a0a5a1610e63860a385f"
    ]

    const tx = await contract.definiteNFT.TryMintMultiple(contract.PRIVATE_ADDRESS1, developersURI);
    await tx.wait();
    console.log(tx);
}

main();
