import React, { Component } from "react";
import web3 from "../../web3";
import { infura, pk } from "../../web3";
import voting from "../../voting";

export default class Hasil extends Component {
  state = {
    candidates: [],
    candidatesVotes: [],
    electionStarted: "loading",
    showResult: false
  };

  async componentDidMount() {
    let candidateObject;
    const numberOfCandidates = await voting.methods.get_num_candidates().call();
    const candidates = [];
    const candidatesVotes = [];
    for (let i = 0; i < numberOfCandidates; i++) {
      candidateObject = await voting.methods.get_candidate(i).call();
      candidates[i] = candidateObject._candidate;
      candidatesVotes[i] = candidateObject._votes;
    }
    this.setState({ candidates });
    this.setState({ candidatesVotes });
    const electionStarted = await voting.methods.electionStarted().call();
    this.setState({ electionStarted });
  }

  render() {
    if (this.state.electionStarted === "loading") {
      return null;
    } else if (this.state.electionStarted === false) {
      return (
        <div>
          <h2>Hasil Pemilihan Ketua RT XYZ</h2>
          <table className="voteResult">
            <tbody>
              <tr>
                <th>Nama Kandidat</th>
                <th>Perolehan Suara</th>
              </tr>
              <tr>
                <td>{this.state.candidates[0]}</td>
                <td>{this.state.candidatesVotes[0]}</td>
              </tr>
              <tr>
                <td>{this.state.candidates[1]}</td>
                <td>{this.state.candidatesVotes[1]}</td>
              </tr>
              <tr>
                <td>{this.state.candidates[2]}</td>
                <td>{this.state.candidatesVotes[2]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <h2>
            Hasil Pemilihan Ketua RT XYZ akan diumumkan setelah berakhirnya
            waktu pemilihan
          </h2>
        </div>
      );
    }
  }
}
