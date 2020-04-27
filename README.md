# Requirement
- Node.js
- Ethereum wallet
- Infura account
- MongoDB Atlas account

# Installation
- Run `npm install` on the root of the folder
- Go to `client` directory and run `npm install`
- Go to `blockchain` directory and run `npm install`
- Go to `blockchain\secrets` and insert your Infura endpoint as well as your wallet mnemonic
- We use Mocha for unit testing, you can use the provided test file in `blockchain\test` folder to unit test the smart contract, or you can make your own test cases
- Run `node compile.js` on the `blockchain` folder to compile your smart contract, then run `node deploy.js` to deploy your smart contract
- Go to `config` folder and insert the required fields on `defaultDummy.json` and `productionDummy.json`, then rename those files to `default.json` and `production.json`
- Go to `client\src` folder, open `web3Dummy.js` and follow the instruction
- Go to the root of the folder and run `npm run dev` to run it locally
