import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BootPath from "./../../BootPath";
import "./Login.css";

import { useContext } from "react";
import Login from "./Login";
const MyLogin = () => {
  const { bootpath } = useContext(BootPath);

  const [param, setParam] = useState({});
  const handleChange = (e) => {
    setParam({
      ...param,
      [e.target.name]: e.target.value,
    });
  };
  const save = () => {
    if (document.querySelector("input").value === "") {
      alert("이메일을 입력해 주세요");
    }

    getApi();
  };
  const getApi = () => {
    axios.post(bootpath + "/member/devlogin", param).then((res) => {
      if (res.data.result === "success") {
        sessionStorage.setItem("no", res.data.no);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("name", res.data.name);

        if (sessionStorage.getItem("no") == 0) {
          window.location.href = "/admin/regularpay";
          return;
        }

        window.location.href = "/member/info";
      }
    });
  };
  return (
    <>
      <div className="sub">
        <div className="size">
          <input
            type="text"
            name="email"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
            }}
          />
          <Link className="btn" onClick={save}>
            로그인
          </Link>
          <hr className="line"></hr>
          <br />
        </div>
      </div>
    </>
  );
};

export default MyLogin;
