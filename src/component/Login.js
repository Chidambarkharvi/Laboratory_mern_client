import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";
import loginpic from "../images/login.jpg";

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/actions/userAction";
import Errorpop from "./CustomComp/Errorpop";

function Login() {
  const [modalshow, setmodalshow] = useState(false);
  const [modalerror, setmodalerror] = useState("")

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const [isEmailValid, setisEmailValid] = useState(false);
  const [emailError, setemailError] = useState("");
  let isValid;
  let isValidPass;
  const [isPasswordValid, setisPasswordValid] = useState(false);
  const [passwordError, setpasswordError] = useState("");

  const loginPost = async (e) => {
    // e.preventDefault();

    const url = "http://localhost:7000/user/login ";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role.toLowerCase());
      alert("Login successful");
      dispatch(userAction(true));
      history.push("/details", { replace: true });
    } else if (res.status === 400) {
      // alert("Fill all the fields");
      setmodalshow(!modalshow);

    } else if (res.status === 401) {
      setmodalshow(!modalshow);
      setmodalerror("User does not exist")
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    isValid = validateEmail(email);
    isValidPass = validatePassword(password);

    if (isValid && isValidPass) {
      loginPost();
    }
  };

  const validateEmail = (email) => {
    const mailexp =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,12})$/;
    if (mailexp.test(email)) {
      setisEmailValid(true);
      setemailError("");
      return true;
    } else {
      setisEmailValid(false);
      setemailError("enter valid email");
      return false;
    }
  };

  const validatePassword = (password) => {
    const passwordExp = /(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}/;
    if (password.length > 3) {
      setisPasswordValid(true);
      setpasswordError("");
      return true;
    } else {
      setisPasswordValid(false);
      setpasswordError(" enter valid password");
      return false;
    }
  };
  const error = (val) => {
    return true;
  };
  return (
    <div>
      <section className="sign-in">
        <div className="container1 mt-5">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={loginpic} alt="login image" />
              </figure>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>

              <form
                method="POST"
                className="register-form"
                id="register-form" 
                onSubmit={loginUser}
              >
                <div className="mb-3  form-group">
                  <label htmlFor="email">
                    <HiOutlineMail />
                  </label>
                  <input
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                    value={email}
                    type="email"
                    id="email"
                    title="email"
                    placeholder="Enter password"
                  />
                  {!isEmailValid ? (
                    <span
                      style={{
                        color: "red",
                        display: "block",
                        fontSize: "15px",
                      }}
                    >
                      {emailError}
                    </span>
                  ) : null}
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="password">
                    <RiLockPasswordFill />
                  </label>
                  <input
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                    value={password}
                    type="password"
                    title="password"
                    placeholder="Enter email"
                    id="password"
                  />
                  {!isPasswordValid ? (
                    <span
                      style={{
                        color: "red",
                        display: "block",
                        fontSize: "15px",
                      }}
                    >
                      {passwordError}
                    </span>
                  ) : null}
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                    onClick={loginUser}
                    title="loginBtn"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Errorpop modalerror={modalerror} modalshow={modalshow} handleClose={() => setmodalshow(false)} />
    </div>
  );
}

export default Login;
