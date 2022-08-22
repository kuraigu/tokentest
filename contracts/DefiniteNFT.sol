// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/* 
 * @author Innoh Reloza
 * @dev This contract tests minting, multimint
 *      For upskilling purposes
 */ 
contract DefiniteNFT is ERC721, ERC721URIStorage, Ownable {
    constructor() ERC721("DefiniteNFT", "DFT") {}

    using Counters for Counters.Counter;

    /* 
     * @dev This would determine the last index of the NFT of the minted
     */
    Counters.Counter _tokenIDs;

    function TryMintMultiple(address to, string[] memory tokenURI) public
    {
        require(tokenURI.length > 0, "Error: tokenURI must be greater than 0!");

        for(uint i = 0; i < tokenURI.length; i++)
        {
            TryMint(to, tokenURI[i]);
        }
    }

    function TryMint(address to, string memory tokenURI) public
    {
        _mint(to, _tokenIDs.current());
        _setTokenURI(_tokenIDs.current(), tokenURI);

        _tokenIDs.increment();
    }

    /* 
     *  @dev For testing purposes only, remove if deployed to mainnet
     *       This will burn all NFTs and reset the _tokenID counter to 0
     */ 
    function BurnAllReset() public
    {
        require(_tokenIDs.current() > 0, "Error: No minted NFT!");
        for(uint i = 0; i < _tokenIDs.current(); i++)
        {
            _burn(i);
        }

        _tokenIDs.reset();
    }

    /** Required Overrides **/
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        require(_tokenIDs.current() > 0, "Error: No minted NFT");
        super._burn(tokenId);
    }
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /** 0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47, "https://api.jsonbin.io/v3/b/6303763ea1610e63860a073b" **/
}

