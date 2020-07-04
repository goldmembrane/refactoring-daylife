import React from "react";
// import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./Login.css";
// import Calendar from "./Calendar";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    return (
      <form
        id="loginForm"
        onSubmit={(e) => {
          e.preventDefault();

          const data = JSON.stringify(this.state);

          let config = {
            method: "post",
            url: "http://15.164.232.40:3001/user/signin",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios(config)
            .then((response) => {
              console.log(response.data);
              alert("보내기 성공");
              console.log(
                "로그인으로 돌아가줘: ",
                this.props.history.replace("./calendar")
              ); // 로그인에 설공하면 calendar 페이지로 이동
              this.props.onSubmit(data);
              this.props.history("/calendar");
              alert("정보가져오기 성공");
            })
            .catch((error) => {
              console.log("data에 담긴 정보: ", data);
              console.log(`${error}에러 회원가입 다시해라`);
            });
        }}
      >
        <div>
          {/* <label>Email</label> */}
          <input
            className="inputValue"
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={this.handleInputValue("email")}
          ></input>
        </div>
        <div>
          <input
            className="inputValue"
            type="password"
            placeholder="Password"
            onChange={this.handleInputValue("password")}
          ></input>
        </div>
        <button id="clickBt" type="submit">
          Login
        </button>
        {/* <button onClick={() => this.props.history.replace("/signup")}>
          회원가입
        </button> */}
      </form>
    );
  }
}

export default Login;
