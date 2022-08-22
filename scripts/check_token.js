/** 
 * @author Innoh Reloza
 * @dev This is a test script for checking the NFTs owned by PRIVATE_ADDRESS1
*/

const contract = require("../artifacts/contracts/DefiniteNFT.sol/DefiniteNFT.json");
const { API_URL, API_KEY, PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_ADDRESS1, PRIVATE_ADDRESS2, CONTRACT_ADDRESS, URI_ACCESS_KEY } = process.env;
// Providers
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);
const minter = new ethers.Wallet(PRIVATE_KEY1, alchemyProvider);
// Contracts
const definiteNFT = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, minter);

var XMLHttpRequest = require('xhr2');

/**
 * 
 * @param {pass the uri link} uri 
 * @returns returns a promise (which throws a response)
 */
function decodeURI(uri)
{
    return new Promise(function (resolve, reject) 
    {
        let req = new XMLHttpRequest();

        req.open("GET", uri, true);
        req.setRequestHeader("X-Master-Key", URI_ACCESS_KEY, "X-Bin-Meta", false);
        
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                resolve(req.responseText);
            }
        };

        req.send();
    });
}

async function main()
{
    let developersURI = [];
    for(let i = 0; i < 11; i++)
    {
        const tx1 = await definiteNFT.tokenURI(i);
        const tx2 = await definiteNFT.ownerOf(i);

        console.log("NFT id: " + i);
        console.log("Owner: " + tx2);
        
        console.log("Actual URI: " + tx1);
        var uri = await decodeURI(tx1 + "?meta=false");
        console.log("Decoded URI: " + uri);
    }
}

main();