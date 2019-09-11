import React, { Component } from "react";
import ModalVision from "../modal/ModalVision";

class VotingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "#ccc",
      color: "rgb(51, 51, 51)"
    };
  }
  render() {
    return (
      <div
        className="candidateCard"
        style={{
          backgroundColor: this.props.backgroundColor,
          color: this.props.color
        }}
      >
        <div>
          <img
            alt={"Foto " + this.props.name}
            src={this.props.image}
            className="candidate"
          />
          <h3 className="candidateName">{this.props.name}</h3>
          {/* <button className="vote-btn">Visi & Misi</button> */}
          <ModalVision
            name={this.props.name}
            visi={this.props.visi}
            misi={this.props.misi}
          />
          <br />
          <button
            className="vote-btn"
            onClick={this.props.onclick}
            disabled={this.props.isDisabled}
          >
            Vote {this.props.name}
          </button>
        </div>
      </div>
    );
  }
}

export default VotingCard;
