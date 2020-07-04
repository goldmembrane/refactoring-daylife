import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import "./Signup.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 받아야하는 회원가입 데이터들 즉, 인풋 값들
      email: "",
      isEmailValid: false, // 나중에 활성화
      password: "",
      // isPasswordValid: false, // 나중에 활성화
      username: "",
      // isUsernameValid: false, // 나중에 활성화
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  // validateName = (email) => {
  //   if (email.length > 10) {
  //     this.setState({
  //       isEmailValid: true,
  //       email,
  //     });
  //   } else {
  //     this.setState({
  //       isEmailValid: false,
  //       email,
  //     });
  //   }
  // };

  // isEmailValid = () => {
  //   const { email, isEmailValid } = this.state;
  //   if (email) return isEmailValid;
  // };

  // inputClassNameHelper = (boolean) => {
  //   switch (boolean) {
  //     case true:
  //       return "is-valid";
  //     case false:
  //       return "is-invalid";
  //     default:
  //       return "";
  //   }
  // };

  render() {
    return (
      <form
        id="signupForm"
        className="content"
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
              this.props.history.replace("./login"); // 회원가입 성공하면 로그인 페이지로 돌아가고
              alert("성공");
              this.props.onSubmit(data);
            })
            .catch((error) => {
              console.log("data에 담긴 정보: ", data);
              console.log(`${error}에러 회원가입 실패`);
            });
        }}
      >
        <div>
          <input
            // className={`form-control ${this.inputClassNameHelper(
            //   // 나중에 서버에서 데이터를 잘 받아가면 다시 활성화
            //   this.isEmailValid()
            // )}`}
            type="email"
            placeholder="Email"
            // onChange={(e) => this.validateName(e.target.value)}
            onChange={this.handleInputValue("email")}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={this.handleInputValue("password")}
          ></input>
        </div>
        {/* <div>  // 패스워드가 맞는지 체크해주는 녀석인데 나중에 활성화할 수 있으면 하자
              <input
                className="textBox"
                // onChange={this.handleInputValue("password")}
                type="password"
                placeholder="Password check"
              ></input>
            </div> */}
        <div>
          <input
            placeholder="username"
            onChange={this.handleInputValue("username")}
          ></input>
        </div>
        <button id="clickBt" type="submit">
          Sign Up
        </button>
      </form>
    );
  }
}

export default Signup;
