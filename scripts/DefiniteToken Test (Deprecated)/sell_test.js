
// ABI
const contract = require("../artifacts/contracts/DefiniteToken.sol/DefiniteToken.json");

const { API_URL, API_KEY, PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_ADDRESS1, PRIVATE_ADDRESS2, CONTRACT_ADDRESS} = process.env;

// Providers
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signers

const minter = new ethers.Wallet(PRIVATE_KEY1, alchemyProvider);
// Contracts
const definiteToken = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, minter);

async function main()
{
    console.log("Setting for sale");
    const tx1 = await definiteToken.SetNFTForSale(32);
    await tx1.wait();
    console.log(tx1);
}

main();