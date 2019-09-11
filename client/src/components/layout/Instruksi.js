import React, { Component } from "react";
import MenuImg from "../../img/Menu2.PNG";
import RegisterImg from "../../img/Registrasi2.PNG";
import AktivasiImg from "../../img/Aktivasi2.png";
import LoginImg from "../../img/Login2.PNG";
import DashboardImg from "../../img/Dashboard2.PNG";
import DashboardHighlightImg from "../../img/Dashboard-highlighted2.PNG";
import DashboardVoteWaitingImg from "../../img/Dashboard-vote-waiting.PNG";
import DashboardVoteDoneImg from "../../img/Dashboard-vote-done.PNG";
export default class Instruksi extends Component {
  render() {
    return (
      <div>
        <ol className="instruction-list">
          <li>
            <h4 className="instruction">
              Pastikan anda sudah terdaftar sebagai pemilih tetap RT XYZ, temui
              perwakilan RT anda jika anda belum terdaftar sebagai pemilih tetap
            </h4>
          </li>
          <li>
            <h4 className="instruction">
              Pada menu utama, klik Registrasi untuk melakukan registrasi
            </h4>
            <img
              src={MenuImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Lakukan registrasi dengan memasukan NIK, No. KK, nama, tanggal
              lahir, email, dan password.
            </h4>
            <img
              src={RegisterImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Lakukan aktivasi akun dengan mengkonfirmasi email yang digunakan
              saat registrasi.
            </h4>
            <img
              src={AktivasiImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Lakukan login dengan memasukan NIK dan password yang digunakan
              pada saat registrasi.
            </h4>
            <img
              src={LoginImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Pilihlah kandidat pilihan anda, anda juga dapat melihat visi &
              misi kandidat yang ada sebelum memilih.
            </h4>
            <img
              src={DashboardImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Konfirmasi pilihan anda dengan menekan Confirm Vote
            </h4>
            <img
              src={DashboardHighlightImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Submit pilihan anda dan tunggu sampai sistem selesai memproses
            </h4>
            <img
              src={DashboardVoteWaitingImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Sistem telah selesai memproses dan anda dapat melihat pilihan anda
              telah terpilih
            </h4>
            <img
              src={DashboardVoteDoneImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Anda dapat melihat hasil pemilihan setelah pemilihan selesai
            </h4>
          </li>
        </ol>
      </div>
    );
  }
}
