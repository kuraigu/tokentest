


// ABI
const contract = require("../artifacts/contracts/DefiniteToken.sol/DefiniteToken.json");

const { API_URL, API_KEY, PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_ADDRESS1, PRIVATE_ADDRESS2, CONTRACT_ADDRESS} = process.env;

// Providers
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signers

const seller = new ethers.Wallet(PRIVATE_KEY1, alchemyProvider);
const buyer = new ethers.Wallet(PRIVATE_KEY2, alchemyProvider);
// Contracts
const definiteTokenSeller = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, seller);
const definiteTokenBuyer = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, buyer);



function formatNFTDetails(details)
{
    let output = []
    for(let i = 0; i < details.length; i++)
    {
        let temp = details[i].toString().split(",");
        temp[0] = " | ID: " + temp[0];
        temp[1] = " Details: " + temp[1];
        temp[2] = " | Is For Sale: " + temp[2] + " |\n";
        output += temp;
    }

    return output.toString();
}

async function main()
{
    console.log("Checking...");
    console.log("Owner: " + PRIVATE_ADDRESS1);
    const tx1 = await definiteTokenSeller.GetNFTDetailsFromAddress();
    const test1 = formatNFTDetails(tx1);
    console.log(test1);

    console.log("Owner: " + PRIVATE_ADDRESS2);
    const tx2 = await definiteTokenBuyer.GetNFTDetailsFromAddress();
    const test2 = formatNFTDetails(tx2);
    console.log(test2);

}

main();