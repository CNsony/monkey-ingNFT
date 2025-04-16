'use client'
import { useState } from "react";
import {ethers,BigNumber} from 'ethers'
import roboPunksNFT from './RoboPunksNFT.json'
const roboPunksNFTAddress = '0x2F1a2749e4eDAc23447Dd516806741850Ec4Bb82'
const MainMint = ({account}) => {
  const [mintAmount,setMintAmount] = useState(1)
  const isConnected = Boolean(account[0])
  async function handleConnect() {
    if((window as any).ethereum){
        try{
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xaa36a7' }], // Sepolia 的 chainId
              });
        }catch (switchError: any) {
            if (switchError.code === 4902) {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: '0xaa36a7',
                    chainName: 'Sepolia',
                    rpcUrls: ['https://sepolia.infura.io/v3/YOUR-PROJECT-ID'],
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18
                    },
                    blockExplorerUrls: ['https://sepolia.etherscan.io']
                  }]
                });
              }
        }
      const accounts = new ethers.providers.Web3Provider((window as any).ethereum)
      const signer = accounts.getSigner()
      const contract = new ethers.Contract(roboPunksNFTAddress,roboPunksNFT.abi,signer)
      try{
        const response = await contract.mint(BigNumber.from(mintAmount),{
            value:ethers.utils.parseEther((0.02*mintAmount).toString())
        })
        console.log('response: ',response)
      }catch(err){
        console.log('error: ',err)
      }
    }
  }
  const handleDecrement = () => {
    if(mintAmount<=1) {
        return
    }
    setMintAmount(mintAmount-1)
  }
  const handleIncrement = () => {
    if(mintAmount>=3) {
        return
    }
    setMintAmount(mintAmount+1)
  }
  return (
   <div>
    <h1>1</h1>
    <p>2</p>
    {
        isConnected ? (
            <div>
                <p>3</p>
                <div>
                    <p>4</p>
                    <button onClick={handleDecrement}>-</button>
                    <p>{mintAmount}</p>
                    <button onClick={handleIncrement}>+</button>
                </div>
                <p>7</p>
                <button onClick={handleConnect}>mint now</button>
           </div>
        ):(
         <div>you are not connected</div> 
        )
    }
   </div> 
  )
}
export default MainMint