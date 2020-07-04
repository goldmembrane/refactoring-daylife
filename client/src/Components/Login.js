import React from "react";
import axios from "axios";
import Title from "./Title";
import "./Login.css";

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
      <div>
        <Title />
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
                this.props.onSubmit(data);
                alert("로그인 성공");
                this.props.history("/calendar");
              })
              .catch((error) => {
                console.log("data에 담긴 정보: ", data);
                console.log(`${error}에러 회원가입 다시해라`);
              });
          }}
        >
          <label className="label">로그인 정보를 입력하세요</label>
          <div>
            <input
              className="inputValue"
              type="email"
              placeholder="Email"
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
      </div>
    );
  }
}

export default Login;
