import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    NIK: "",
    NKK: "",
    nama: "",
    tanggalLahir: new Date(),
    email: "",
    password: "",
    password2: ""
  });

  const { NIK, NKK, nama, tanggalLahir, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeDate = date => setFormData({ ...formData, tanggalLahir: date });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password tidak sama", "danger");
    } else {
      register({ NIK, NKK, nama, tanggalLahir, email, password });
      setAlert(
        "Registrasi sukses, check email anda untuk mengaktivasi akun anda",
        "success"
      );
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Registrasi</h1>
      <p className="lead">
        <i className="fas fa-user" /> Pastikan anda sudah terdaftar sebagai
        pemilih tetap, temui perwakilan RT anda jika anda belum terdaftar
        sebagai pemilih tetap
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="NIK"
            name="NIK"
            value={NIK}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="No. KK"
            name="NKK"
            value={NKK}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nama di KTP"
            name="nama"
            value={nama}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <DatePicker
            selected={formData.tanggalLahir}
            onChange={changeDate}
            dateFormat="dd/MM/yyyy"
            name="tanggalLahir"
            value={tanggalLahir}
          />
          <small className="form-text">Tanggal Lahir</small>
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Registrasi" />
      </form>
      <p className="my-1">
        Sudah melakukan registrasi? <Link to="/login">Login</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
