const { ethers } = require("hardhat")

const constants = {
	developmentChains: ["hardhat", "localhost"],
	testNetChains: ["mumbai"],
	NULL_ADDRESS: ethers.constants.AddressZero,
	FRONTEND_FILE_PATH: "",
}

const scriptsConfig = {}

const contractsConfig = {
	TurtleShellToken: {
		name: "TurtleShellToken",
		args: {
			name: "TurtleShellToken",
			symbol: "TST",
		},
	},
}

const networkConfig = {
	1: {
		name: "mainnet",
		contracts: contractsConfig,
	},
	5: {
		name: "goerli",
		contracts: contractsConfig,
		forTests: [],
	},
	31337: {
		name: "hardhat",
		contracts: contractsConfig,
		forTests: [
			{ name: "DemoContract", args: [] },
			{ name: "CustomERC4671", args: ["TestToken", "TT"] },
		],
	},
}

module.exports = {
	constants,
	scriptsConfig,
	networkConfig,
}
