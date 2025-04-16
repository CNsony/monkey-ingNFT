import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-ignition";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import dotenv from 'dotenv'
dotenv.config()
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks:{
    // hardhat:{
    //   chainId:1337
    // }
    infura:{
      url:process.env.RPC_URL,
      accounts:[process.env.RPIVATE_KEY  as string]
    }
  },
  etherscan:{
    apiKey:process.env.ETHERSCAN_API_KEY
  }
};

export default config;
