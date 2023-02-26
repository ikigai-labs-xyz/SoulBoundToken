require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("solidity-coverage")
require("hardhat-deploy")
require("@primitivefi/hardhat-dodoc")

const GOERLI_RPC_URL =
	process.env.RPC_URL !== undefined ? process.env.RPC_URL.replace("network", "goerli") : ""
const GOERLI_RPIVATE_KEY = process.env.GOERLI_PRIVATE_KEY !== undefined ? process.env.GOERLI_PRIVATE_KEY : ""
const MAINNET_RPC_URL =
	process.env.RPC_URL !== undefined ? process.env.RPC_URL.replace("network", "mainnet") : ""
const MAINNET_PRIVATE_KEY =
	process.env.MAINNET_PRIVATE_KEY !== undefined ? process.env.MAINNET_PRIVATE_KEY : ""
const EXPLORER_API_KEY = process.env.EXPLORER_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const REPORT_GAS = process.env.REPORT_GAS

module.exports = {
	solidity: {
		version: "0.8.9",
		defaultNetwork: "hardhat",
		// compilers: [{ version: "0.8.13", settings: { optimizer: { enabled: true, runs: 200 } } }],
		settings: {
			optimizer: {
				// => optimizer makes contract sizes smaller
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		hardhat: {
			chainId: 31337,
			blockConfirmations: 1,
		},
		localhost: {
			chainId: 31337,
			blockConfirmations: 1,
		},
		goerli: {
			chainId: 5,
			blockConfirmations: 6,
			url: GOERLI_RPC_URL,
			accounts: [GOERLI_RPIVATE_KEY],
		},
		mainnet: {
			chainId: 1,
			blockConfirmations: 6,
			url: MAINNET_RPC_URL,
			accounts: [MAINNET_PRIVATE_KEY],
		},
	},
	namedAccounts: {
		deployer: {
			default: 0,
		},
		user: {
			default: 1,
		},
	},
	gasReporter: {
		enabled: REPORT_GAS,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: COINMARKETCAP_API_KEY,
		// token: "MATIC",
		excludeContracts: [],
	},
	etherscan: {
		apiKey: EXPLORER_API_KEY,
	},
	dodoc: {
		runOnCompile: false,
		exclude: [],
	},
	mocha: {
		timeout: 300000,
	},
}
