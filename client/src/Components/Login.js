import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            fetch("http://15.164.232.40:3001/user/signin", {
              method: "POST",
              body: JSON.stringify(this.state),
              credentials: "include",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((res) => {
                if (res.status === 200) {
                  console.log("200코드 받음 잘됨");
                  localStorage.setItem("isLogin", 1);
                  return res.json();
                }
              })
              .then((data) => {
                if (data) {
                  this.props.handleLogin();
                  history.push("./calendar");
                } else {
                  alert(`회원가입을 진행하시거나 로그인을 다시 시도해 주세요.`);
                }
              });
          }}
        >
          <div id="main-label">Login</div>
          <div>
            <input
              className="login-input-value"
              type="email"
              placeholder="  Email"
              onChange={this.handleInputValue("email")}
            ></input>
          </div>
          <div>
            <input
              className="login-input-value"
              type="password"
              placeholder="  Password"
              onChange={this.handleInputValue("password")}
            ></input>
          </div>
          <div>
            <input type="checkbox" />
            로그인 정보를 기억합니다.
          </div>
          <button id="click-login-button" type="submit">
            Sign In
          </button>
          <div
            id="google-login-button"
            class="g-signin2"
            data-onsuccess="onSignIn"
          ></div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
