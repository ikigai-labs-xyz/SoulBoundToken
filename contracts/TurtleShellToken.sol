// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./NonTransferableToken.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract TurtleShellToken is NonTransferableToken, Ownable {
	using Counters for Counters.Counter;

	Counters.Counter private s_tokenIdCounter;
	mapping(uint256 => bytes) s_tokenURIs;

	constructor(string memory name, string memory symbol) NonTransferableToken(name, symbol) {}

	function mint(address to, string memory _tokenURI) external onlyOwner {
		uint256 tokenId = s_tokenIdCounter.current();
		s_tokenIdCounter.increment();

		s_tokenURIs[tokenId] = bytes(_tokenURI);
		_mint(to, tokenId);
	}

	/// @dev FUNCTION OVERRIDES

	function tokenURI(uint256 tokenId) external view returns (string memory) {
		_requireMinted(tokenId);

		return string(s_tokenURIs[tokenId]);
	}
}
