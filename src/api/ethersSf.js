export const ethers = require('ethers');
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");

export let provider, signer, sf;

export async function connectWallet() {
    await window.ethereum.enable();
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = await provider.getSigner();
    let signerAddress = await signer.getAddress();
    return [signerAddress, provider];
}

export async function connectSuperfluid(provider) {
    await window.ethereum.enable();
    sf = new SuperfluidSDK.Framework({
        ethers: new Web3Provider(window.ethereum),
    });
    await sf.initialize();
}

export const connectAll = async () => {
    let res = await connectWallet();
    await connectSuperfluid(res[1]);

    return res;
}

export function getflowRate(strAmt, duration) {

    let amt = ethers.utils.bigNumberify(strAmt);
    amt = amt.mul(ethers.constants.WeiPerEther)
    amt = amt.div(60 * 60 * 24)
    amt = amt.div([7, 30, 365][duration]);
    console.log('Line 2', amt.toString())
    return amt.toString();
}

export async function transferERC20(tokenAddress, depositAddress, amount) {
    amount = ethers.utils.parseUnits(amount);
    // Read-Write; By connecting to a Signer, allows:
    // - Everything from Read-Only (except as Signer, not anonymous)
    // - Sending transactions for non-constant functions
    const erc20_rw = new ethers.Contract(tokenAddress, abi, signer)
    console.log(erc20_rw);
    await erc20_rw.transfer(depositAddress, amount);
}

// A Human-Readable ABI; any supported ABI format could be used
const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (boolean)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

// This can be an address or an ENS name


