// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    address payable owner;

    uint256 private _tokenIds;
    uint256 private _itemsSold;

    uint256 listPrice = 0.01 ether;

    constructor() ERC721("NFTMarketplace","NFTM") {
        owner = payable(msg.sender);
    }

    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    mapping(uint256 => ListedToken) private idToListedToken;

    function updateListPrice(uint256 _listedPrice) public payable {
        require(owner == msg.sender, "only Owner can Update the listing price");
        listPrice = _listedPrice;
    }

    function getListedPrice() public view returns (uint256) {
        return listPrice;
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        return idToListedToken[_tokenIds];
    }

    function getListedForTokenId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds;
    }

    function createtoken(string memory tokenURI, uint256 price) public payable returns (uint256) {
        require(msg.value == listPrice, "Send enough ether to list");
        require(price > 0, "Make sure the price isn't negative");
        
        _tokenIds++; // Increment the token ID
        uint256 currentTokenId = _tokenIds;
        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);
        createListedToken(currentTokenId, price);
        return currentTokenId;
    }

    function createListedToken(uint256 tokenId, uint256 price) private {
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );
        _transfer(msg.sender, address(this), tokenId);
    }

    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds;
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;

        for (uint256 i = 1; i <= nftCount; i++) {
            ListedToken storage currentItem = idToListedToken[i];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return tokens;
    }

    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds;
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 1; i <= totalItemCount; i++) {
            if (idToListedToken[i].owner == msg.sender || idToListedToken[i].seller == msg.sender) {
                itemCount += 1;
            }
        }

        ListedToken[] memory items = new ListedToken[](itemCount);
        for (uint i = 1; i <= totalItemCount; i++) {
            if (idToListedToken[i].owner == msg.sender || idToListedToken[i].seller == msg.sender) {
                ListedToken storage currentItem = idToListedToken[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        uint price = idToListedToken[tokenId].price;
        address seller = idToListedToken[tokenId].seller;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idToListedToken[tokenId].currentlyListed = false; // Set as not currently listed
        idToListedToken[tokenId].seller = payable(msg.sender);
        _itemsSold++;

        _transfer(address(this), msg.sender, tokenId);
        approve(address(this), tokenId);
        
        payable(owner).transfer(listPrice);
        payable(seller).transfer(msg.value);
    }
}
