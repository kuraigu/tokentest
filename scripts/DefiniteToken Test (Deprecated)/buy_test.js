
// ABI
const contract = require("../artifacts/contracts/DefiniteToken.sol/DefiniteToken.json");

const { API_URL, API_KEY, PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_ADDRESS1, PRIVATE_ADDRESS2, CONTRACT_ADDRESS} = process.env;

// Providers
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signers

const buyer = new ethers.Wallet(PRIVATE_KEY2, alchemyProvider);
// Contracts
const definiteToken = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, buyer);

async function main()
{
    console.log("Buying...");
    const tx1 = await definiteToken.BuyFromAddress(PRIVATE_ADDRESS1, 9, {value: ethers.utils.parseUnits('0.01','ether') });
    await tx1.wait();
    console.log(tx1);
}

main();