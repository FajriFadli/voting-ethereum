const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let voting, accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  voting = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Voting Blockchain", () => {
  it("Contract has been deployed", () => {
    assert.ok(voting.options.address);
  });

  it("There's an authorized ethereum address", async () => {
    const authAddress = await voting.methods.electionAuthority().call();
    assert.equal(authAddress, accounts[0]);
  });

  it("Register candidate and check total candidates", async () => {
    await voting.methods.register_candidate("Zaenal").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Zakariah").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Subadri").send({
      from: accounts[0]
    });
    assert.equal(await voting.methods.candidates(0).call(), "Zaenal");

    const candidateNum = await voting.methods.get_num_candidates().call();
    assert.equal(candidateNum, 3);
    assert.ok(await voting.methods.get_candidate(1).call());
  });

  it("Can vote for candidate on voting period", async () => {
    await voting.methods.register_candidate("Zaenal").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Zakariah").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Subadri").send({
      from: accounts[0]
    });

    await voting.methods.startElection().send({
      from: accounts[0]
    });

    await voting.methods.vote("Zaenal").send({
      from: accounts[0]
    });
    await voting.methods.vote("Zaenal").send({
      from: accounts[0]
    });
    const candidateVote = await voting.methods.get_candidate(0).call();
    assert.equal(candidateVote._votes, 2);
  });

  it("Only able to vote from authorized ethereum address", async () => {
    await voting.methods.register_candidate("Zaenal").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Zakariah").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Subadri").send({
      from: accounts[0]
    });
    try {
      await voting.methods.vote("Zaenal").send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("Can only vote on voting period", async () => {
    await voting.methods.register_candidate("Zaenal").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Zakariah").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Subadri").send({
      from: accounts[0]
    });
    await voting.methods.stopElection().send({
      from: accounts[0]
    });
    try {
      await voting.methods.vote("Zaenal").send({
        from: accounts[0]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("Past vote value turned to zero when reset", async () => {
    await voting.methods.register_candidate("Zaenal").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Zakariah").send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Subadri").send({
      from: accounts[0]
    });

    await voting.methods.startElection().send({
      from: accounts[0]
    });

    await voting.methods.vote("Zaenal").send({
      from: accounts[0]
    });
    await voting.methods.vote("Zaenal").send({
      from: accounts[0]
    });
    const candidateVote = await voting.methods.get_candidate(0).call();
    assert.equal(candidateVote._votes, 2);

    await voting.methods.stopElection().send({
      from: accounts[0]
    });

    await voting.methods.reset().send({
      from: accounts[0]
    });
    await voting.methods.register_candidate("Zaenal").send({
      from: accounts[0]
    });

    const newCandidateVote = await voting.methods.get_candidate(0).call();
    assert.equal(newCandidateVote._votes, 0);
  });
});
