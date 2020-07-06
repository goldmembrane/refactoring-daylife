import React from "react";
import axios from "axios";
import Title from "./Title";
import "./Signup.css";
import { withRouter } from "react-router-dom";

class Signup extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  handleInputEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleInputUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnPasswordInput(passwordInput) {
    this.setState({ password: passwordInput });
  }

  handleOnConfirmPasswordInput(confirmPasswordInput) {
    this.setState({ confirmPassword: confirmPasswordInput });
  }

  doesPasswordMatch() {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  }

  renderFeedbackMessage() {
    const { confirmPassword } = this.state;

    if (confirmPassword) {
      if (!this.doesPasswordMatch()) {
        return <div>패스워드가 일치하지 않습니다!!</div>;
      }
    }
  }

  render() {
    // console.log("회원가입 히스토리:", this.props.history);
    return (
      <div>
        <Title />
        <form
          id="main-signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              username: this.state.username,
            });

            let config = {
              method: "post",
              url: "http://15.164.232.40:3001/user/signup",
              headers: {
                "Content-Type": "application/json",
              },
              data: data,
            };

            axios(config)
              .then((response) => {
                console.log(response.data);
                alert(`${this.state.username}님 회원가입 하셨습니다.`);

                this.props.history.replace("./login");
              })
              .catch((error) => {
                alert(`${error} 에러 입니다.`);
              });
          }}
        >
          <label id="main-label">Create Account</label>
          <div>
            <input
              className="signup-input-value"
              type="email"
              placeholder="  Email"
              onChange={this.handleInputEmail}
            ></input>
          </div>
          <div>
            <input
              className="signup-input-value"
              placeholder="  Username"
              onChange={this.handleInputUsername}
            ></input>
          </div>
          <div>
            <input
              className="signup-input-value"
              type="password"
              placeholder="  Password"
              onChange={(e) => this.handleOnPasswordInput(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              className="signup-input-value"
              onChange={(e) =>
                this.handleOnConfirmPasswordInput(e.target.value)
              }
              type="password"
              placeholder="  Password check"
            ></input>
          </div>
          <small id="feedback-message">{this.renderFeedbackMessage()}</small>
          <button id="click-signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
