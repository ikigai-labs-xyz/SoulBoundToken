// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CustomERC4671.sol";

/**
 * @title TurtleShellToken
 * @author Philipp Keinberger
 * @notice Non-Transferable-Token that allows for minting automated Audit badges
 * @dev This contract is an implementation of the `CustomERC4671` token. It allows the
 * owner to mint soul bound tokens with a custom URI.
 */
contract TurtleShellToken is CustomERC4671, Ownable {
	constructor(string memory name, string memory symbol) CustomERC4671(name, symbol) {}

	function mint(address to, string memory _tokenURI) external onlyOwner {
		_mint(to, _tokenURI);
	}
}
