// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract DefiniteToken
{
    uint _totalNumOfNFT;
    mapping(address => NFT[]) public _NFTOnAddress;

    struct NFT 
    {
        uint _id;
        string _details;
        bool _isForSale;
    }

    constructor()
    {
        _totalNumOfNFT = 0;
    }

    /** 
    * @dev Removes an index from a dynamic array 
    */
    function RemoveID(address owner, uint id) public
    {
        require(_NFTOnAddress[owner].length > id, "Index does not exist!");
        
        for (uint i = id; i< _NFTOnAddress[owner].length-1; i++)
        {
            _NFTOnAddress[owner][i] = _NFTOnAddress[owner][i+1];
        }
        _NFTOnAddress[owner].pop();
    }

    function MultipleMint(string[] memory details) public
    {
        for (uint i = 0; i < details.length; i++)
        {
            Mint(details[i]);
        }    
    }

    // Burns all NFT (for testing, remove once deployed)
    function BurnAllNFT() public 
    {
        for(uint i = _NFTOnAddress[msg.sender].length; i > 0; i--)
        {
            _NFTOnAddress[msg.sender].pop();
        }
    }

    /** 
    * @dev Mints an NFT with a unique identifier (_id)
    */
    function Mint(string memory details) public 
    {
        NFT memory temp;
        temp._id = _totalNumOfNFT;
        temp._details = details;
        _NFTOnAddress[msg.sender].push(temp);

        _totalNumOfNFT++;
    }

    /*
    * @dev Gets all the NFTs available from the address
    * @returns Dynamic array of NFT struct
    */
    function GetNFTDetailsFromAddress() public view returns(NFT[] memory)
    {
        require(_totalNumOfNFT > 0, "There have been no NFTs minted in the contract yet");
        require(_NFTOnAddress[msg.sender].length > 0, "You don't have any NFTs");

        return _NFTOnAddress[msg.sender];
    }

    /* 
    * @dev Sets NFTs for sale, this is useful for safechecking
    */
    function SetNFTForSale(uint idOnWallet) public
    {
        require(_totalNumOfNFT > 0, "There have been no NFTs minted in the contract yet");
        require(_NFTOnAddress[msg.sender].length > 0, "You don't have any NFTs");
        require(_NFTOnAddress[msg.sender].length > idOnWallet, "You don't have that NFT!");

        _NFTOnAddress[msg.sender][idOnWallet]._isForSale = true;
    }

    /*
    * @dev Checks if the NFTs are for sale, if it is, require 1ETH from the buyer, then transfer the NFT to the buyer and the ETH to the seller
    */
    function BuyFromAddress(address payable recepient, uint idOnWallet) public payable
    {
        require(msg.value == 0.01 * 1e18, "Required: 1ETH");
        require(_totalNumOfNFT > 0, "There have been no NFTs minted in the contract yet");
        require(_NFTOnAddress[recepient].length > 0, "The recepient doesn't have any NFTs!");
        require(_NFTOnAddress[recepient].length > idOnWallet, "The recepient does not have that NFT!");
        require(_NFTOnAddress[recepient][idOnWallet]._isForSale, "The NFT is not for sale!");

        // If everything is true
        recepient.transfer(msg.value);
        NFT memory temp; 
        temp = _NFTOnAddress[recepient][idOnWallet];
        temp._isForSale = false;
        _NFTOnAddress[msg.sender].push(temp);
        RemoveID(recepient, idOnWallet);
    }
}