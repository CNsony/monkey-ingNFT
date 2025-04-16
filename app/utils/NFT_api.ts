const getNFTsFromAlchemy = async (address: string) => {
    try {
      const response = await fetch(
        `https://eth-mainnet.g.alchemy.com/v2/YOUR-ALCHEMY-KEY/getNFTs/?owner=${address}`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      const data = await response.json();
      return data.ownedNfts;
    } catch (error) {
      console.error('获取 Alchemy NFT 失败:', error);
    }
  };
const getNFTsFromMoralis = async (address: string) => {
    try {
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/${address}/nft`,
        {
          headers: {
            'Accept': 'application/json',
            'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_API_KEY as string
          }
        }
      );
      const data = await response.json();
      return data.ownedNfts;
    } catch (error) {
      console.error('获取 Alchemy NFT 失败:', error);
    }
  };


export { getNFTsFromAlchemy ,getNFTsFromMoralis };
