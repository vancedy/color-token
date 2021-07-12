//SPDX-License-Identifier: unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Color is ERC721 {
    uint256 public tokenCounter;
    mapping(uint256 => string) tokenIdToHex;

    mapping(uint256 => string) private _tokenURIs;
    
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol){
        tokenCounter=0;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory){
        require(_exists(tokenId),
        'URI Query for nonexistent token'
        );
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    /**     
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function createCollectible(string memory colorHex, string memory _tokenURI) public {
        
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _tokenURI);
        tokenIdToHex[tokenCounter] = colorHex;
        tokenCounter++;
    }

    
}

