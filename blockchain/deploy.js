const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const path = require("path");
const fs = require("fs");

const mnemonicPath = path.resolve(__dirname, "secrets", "mnemonic.txt");
const endpointPath = path.resolve(__dirname, "secrets", "endpoint.txt");

const provider = new HDWalletProvider(
  fs.readFileSync(mnemonicPath, "utf-8"),
  fs.readFileSync(endpointPath, "utf-8")
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting deployment from account", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });
  console.log("Contract deployed to", result.options.address);
  fs.writeFileSync(
    "result.txt",
    "Contract deployed to " +
      result.options.address +
      ", from address " +
      accounts[0]
  );
  fs.writeFileSync("interface.txt", interface);
};
deploy();
