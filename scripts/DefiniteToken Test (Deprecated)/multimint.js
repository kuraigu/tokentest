


// ABI
const contract = require("../artifacts/contracts/DefiniteToken.sol/DefiniteToken.json");

const { API_URL, API_KEY, PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_ADDRESS1, PRIVATE_ADDRESS2, CONTRACT_ADDRESS} = process.env;

// Providers
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

const minter = new ethers.Wallet(PRIVATE_KEY1, alchemyProvider);
// Contracts
const definiteToken = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, minter);


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
    const developers = ["Carl", "Alyssa", "AC", "Maynard", "Herde", "Baldwin", "Mars", "Renz", "Tala", "Rhea", "Innoh"];

    console.log("Minting...");
    const tx1 = await definiteToken.MultipleMint(developers);
    await tx1.wait();
    console.log(tx1);

    console.log("Owner: " + PRIVATE_ADDRESS1)
    const tx2 = await definiteToken.GetNFTDetailsFromAddress();
    const test = formatNFTDetails(tx2);
    console.log(test);
}

main();