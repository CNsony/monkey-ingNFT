"use client"
import { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import abiJson from '../RoboPunksNFT.json';
import { getNFTsFromMoralis } from '../utils/NFT_api';
const UserProfile = ({ address }: any) => {
  const [nfts, setNfts] = useState<any[]>([]);


  useEffect(() => {
    console.log('user====',address);
    if (address) {
        console.log('user.address====',address);
        getNFTsFromMoralis(address).then((nfts) => {
            console.log('nfts====',nfts);
            setNfts(nfts);
        });
    }
  }, [address]);

  return (
    <div>
      <h1>User Profile</h1>

      
      {/* NFT 资产展示 */}
      <h2>我的 NFT 资产</h2>
      <div className="nft-grid">
        {nfts.map((nft, index) => (
          <div key={index} className="nft-item">
            <p>Token ID: {nft.tokenId}</p>
            <p>Token URI: {nft.tokenURI}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;