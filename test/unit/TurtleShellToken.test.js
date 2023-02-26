const { expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { constants, networkConfig } = require("../../helper-hardhat-config")

const chainId = network.config.chainId
const contractConfig = networkConfig[chainId].contracts.TurtleShellToken
const contractName = contractConfig.name

!constants.developmentChains.includes(network.name)
	? describe.skip
	: describe(contractName, () => {
			let contract, userContract, demoContract, deployer

			beforeEach(async () => {
				deployer = await ethers.getSigner((await getNamedAccounts()).deployer)
				user = await ethers.getSigner((await getNamedAccounts()).user)
				await deployments.fixture(["forTests", "TurtleShellToken"])
				contract = await ethers.getContract(contractName, deployer.address)
				userContract = await ethers.getContract(contractName, user.address)
				demoContract = await ethers.getContract("DemoContract", deployer.address)
			})

			describe("mint", () => {
				let demoIpfsHash
				beforeEach(() => {
					demoIpfsHash = "ipfs://someDemoHash"
				})
				it("can only be called by the owner", async () => {
					await expect(userContract.mint(demoContract.address, 0)).to.be.revertedWith("Ownable:")
				})
				it("stores token URI at correct token Id", async () => {
					const secondDemoIpfsHash = "ifps://secondDemoHash"

					await contract.mint(demoContract.address, demoIpfsHash)
					await contract.mint(demoContract.address, secondDemoIpfsHash)

					const firstUri = await contract.tokenURI(0)
					expect(firstUri).to.equal(demoIpfsHash)

					const secondUri = await contract.tokenURI(1)
					expect(secondUri).to.equal(secondDemoIpfsHash)
				})
				it("mints to the contract address", async () => {
					await contract.mint(demoContract.address, demoIpfsHash)

					const owner = await contract.ownerOf(0)
					expect(owner).to.equal(demoContract.address)
				})
			})
	  })
