const { ethers } = require('ethers')
const axios = require('axios')
require('dotenv').config()

const GOERLI_PROVIDER =  new ethers.JsonRpcProvider(process.env.INFURA_GOERLI);
const WALLET_SECRET = process.env.PRIVATE_KEY;
const API_KEY_ETHERSCAN = process.env.API_KEY;


const UNISWAP_V3_FACTORY_ADDR = `0x1F98431c8aD98523631AE4a59f267346ea31F984`;
const WETH_ADDRESS = `0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6`;
const EK386_ADDRESS = `0x44091AF8c66Dd8e6965A52FC2ff230b22B93a7e4`;


const wallet = new ethers.Wallet(WALLET_SECRET);
const connectedWallet = wallet.connect(GOERLI_PROVIDER)


async function main(){
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${UNISWAP_V3_FACTORY_ADDR}&apikey=${API_KEY_ETHERSCAN}`;
    const res = await axios.get(url);
    const abi = JSON.parse(res.data.result)
    const Factory = new ethers.Contract(
        UNISWAP_V3_FACTORY_ADDR,
        abi,
        GOERLI_PROVIDER
    );


    const tx = await Factory.connect(connectedWallet).createPool(
        WETH_ADDRESS,
        EK386_ADDRESS,
        500,
    );

    await tx.wait();

    const newPoolAddress = Factory.getPool(
        WETH_ADDRESS,
        EK386_ADDRESS,
        500
    )

    console.log('newPoolAddress', newPoolAddress);
}

main().then(() => console.log('done'));










