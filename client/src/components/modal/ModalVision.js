import React, { Component } from "react";
import ReactModal from "react-modal";

export default class ModalCandidate extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Visi & Misi</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
        >
          <h2>{this.props.name}</h2>
          <h3>Visi</h3>
          <p>{this.props.visi}</p>

          <h3>Misi</h3>
          <p>{this.props.misi}</p>
          <button onClick={this.handleCloseModal}>Kembali</button>
        </ReactModal>
      </div>
    );
  }
}
