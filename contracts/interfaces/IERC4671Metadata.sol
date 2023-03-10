// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IERC4671.sol";

/**
 * @title IERC4671Metadata
 * @dev Interface implementation for {https://eips.ethereum.org/EIPS/eip-4671}
 */
interface IERC4671Metadata is IERC4671 {
	/// @return Descriptive name of the tokens in this contract
	function name() external view returns (string memory);

	/// @return An abbreviated name of the tokens in this contract
	function symbol() external view returns (string memory);

	/// @notice URI to query to get the token's metadata
	/// @param tokenId Identifier of the token
	/// @return URI for the token
	function tokenURI(uint256 tokenId) external view returns (string memory);
}
