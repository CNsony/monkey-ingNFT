// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract  RoboPunkNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("RoboPunks", "RP") Ownable(msg.sender){
         mintPrice = 0.02 ether;
         totalSupply = 0;
         maxSupply = 10000;
         maxPerWallet = 3;

    }
  
    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
     }
     function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
     }
     function tokenURI(uint256 tokenId_)public view override returns (string memory){
        require(_exists(tokenId_), "Token does not exist!");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
     }

     function withdraw() public payable onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}("");
        require(success, "Withdraw failed");   
     }
      function _exists(uint256 tokenId) internal view returns (bool) {
         address owner = ownerOf(tokenId); 
         return owner != address(0);
      }

     function mint(uint256 quantity) public payable {
        require(isPublicMintEnabled, "Minting is not enabled");
        require(msg.value == quantity * mintPrice, "Wrong ETH value sent");
        require(totalSupply + quantity <= maxSupply, "Max supply exceeded");
        require(walletMints[msg.sender] + quantity <= maxPerWallet, "Max per wallet exceeded");
        for(uint256 i=0; i<quantity; i++){
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}