import React, { Component } from "react";
import web3 from "../../web3/web3";
import voting from "../../web3/voting";

class AdminPanel extends Component {
  state = {
    adminAddress: "0x7553bfa72d8942141467e113b165b651dcb01fe0",
    account: [],
    value: "",
    registerMsg: "",
    startMsg: "",
    stopMsg: "",
    resetMsg: ""
  };

  async componentDidMount() {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const account = await ethereum.enable();
      this.setState({ account });
    } else if (window.web3) {
      const account = await web3.eth.getAccounts();
      this.setState({ account });
    }
  }

  regisCandidate = async event => {
    event.preventDefault();
    console.log(this.state.value);
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const account = await ethereum.enable();
      this.setState({ registerMsg: "Sedang di proses" });
      await voting.methods.register_candidate(this.state.value).send({
        from: account[0]
      });
      this.setState({ registerMsg: this.state.value + " sukses di daftarkan" });
    } else if (window.web3) {
      const account = await web3.eth.getAccounts();
      this.setState({ registerMsg: "Sedang di proses" });
      await voting.methods.register_candidate(this.state.value).send({
        from: account[0]
      });
      this.setState({ registerMsg: this.state.value + " sukses di daftarkan" });
    }
  };

  startVoting = async event => {
    event.preventDefault();
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const account = await ethereum.enable();
      this.setState({ startMsg: "Sedang di proses" });
      await voting.methods.startElection().send({
        from: account[0]
      });
      this.setState({ startMsg: "Voting dimulai" });
    } else if (window.web3) {
      const account = await web3.eth.getAccounts();
      this.setState({ startMsg: "Sedang di proses" });
      await voting.methods.startElection().send({
        from: account[0]
      });
      this.setState({ startMsg: "Voting dimulai" });
    }
  };

  stopVoting = async event => {
    event.preventDefault();
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const account = await ethereum.enable();
      this.setState({ stopMsg: "Sedang di proses" });
      await voting.methods.stopElection().send({
        from: account[0]
      });
      this.setState({ stopMsg: "Voting dihentikan" });
    } else if (window.web3) {
      const account = await web3.eth.getAccounts();
      this.setState({ stopMsg: "Sedang di proses" });
      await voting.methods.stopElection().send({
        from: account[0]
      });
      this.setState({ stopMsg: "Voting dihentikan" });
    }
  };

  resetVoting = async event => {
    event.preventDefault();
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const account = await ethereum.enable();
      this.setState({ resetMsg: "Sedang di proses" });
      await voting.methods.reset().send({
        from: account[0]
      });
      this.setState({ resetMsg: "Reset berhasil" });
    } else if (window.web3) {
      const account = await web3.eth.getAccounts();
      this.setState({ resetMsg: "Sedang di proses" });
      await voting.methods.reset().send({
        from: account[0]
      });
      this.setState({ resetMsg: "Reset berhasil" });
    }
  };

  render() {
    if (this.state.account[0] === this.state.adminAddress) {
      return (
        <div className="formVoting">
          <div className="candidateCard">
            <form onSubmit={this.regisCandidate}>
              <h3>Registrasi Kandidat</h3>
              <input
                type="text"
                placeholder="Nama Kandidat"
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value })}
                required
              />
              <input type="submit" value="Daftarkan" />
            </form>
            <h3>{this.state.registerMsg}</h3>
          </div>

          <div className="candidateCard">
            <form onSubmit={this.startVoting}>
              <h3>Mulai Voting</h3>
              <input type="submit" value="Mulai" />
            </form>
            <h3>{this.state.startMsg}</h3>
          </div>

          <div className="candidateCard">
            <form onSubmit={this.stopVoting}>
              <h3>Stop Voting</h3>
              <input type="submit" value="Stop" />
            </form>
            <h3>{this.state.stopMsg}</h3>
          </div>

          <div className="candidateCard">
            <form onSubmit={this.resetVoting}>
              <h3>Reset</h3>
              <input type="submit" value="Reset" />
            </form>
            <h3>{this.state.resetMsg}</h3>
          </div>
        </div>
      );
    } else if (web3 === "no eth") {
      return null;
    } else {
      return null;
    }
  }
}

export default AdminPanel;
