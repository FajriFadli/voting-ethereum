import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Selamat Datang & Selamat Memilih</h1>
          <p className="lead">Pemilihan Ketua RT XYZ</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Registrasi
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
