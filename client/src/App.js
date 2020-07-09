import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Main from "./pages/Main";
import Weekly from "./pages/Weekly";
import "./App.css";
import Monthly from "./pages/Monthly";
import { Yearly } from "./pages";
import Title from "./Components/Title";
import "./Components/Calendar.css";
import "./Components/MakePlan.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: 0, // 처음에는 로그인 안되어있음
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = () => {
    // 로그인을 성공한다면 로그인을 값을 트루로 바꿔줄 핸들러
    this.setState({ isLogin: !this.state.isLogin });
  };

  handleLogout = () => {
    // 로그인이 되어있는 상태라면 로그인 버튼이 로그아웃으로 바꿔주는 핸들러
    if (this.state.isLogin) {
      // 트루라면? 로그인 상태라면?
      localStorage.setItem("isLogin", 0);
      this.setState({
        isLogin: !this.state.isLogin, // 펄스로 바꿔주고
      });
    } else {
      // 거짓이라면 Login 그대로 냅둬야 한다
      this.setState({
        isLogin: this.state.isLogin,
      });
    }
  };

  render() {
    const { isLogin } = this.state;
    return (
      <div>
        <Title />
        <Router>
          <div id="main-buttons">
            <Link to="/">
              <button className="router-button">Home</button>
            </Link>
            <Link to="/login">
              <button className="router-button" onClick={this.handleLogout}>
                {parseInt(localStorage.getItem("isLogin")) ? "Logout" : "Login"}
              </button>
            </Link>
            <Link to="/signup" id="signup-link">
              <button className="router-button">Sign Up</button>
            </Link>

            <Link to="/Weekly" />
          </div>
          <Route exact path="/" component={Home} />
          <Switch>
            <Route
              path="/login"
              render={() => (
                <Login isLogin={isLogin} handleLogin={this.handleLogin} />
              )}
            />
            <Route path="/calendar" render={() => <Main isLogin={isLogin} />} />
            <Route path="/Weekly" component={Weekly} />
            <Route path="/Monthly" component={Monthly} />
            <Route path="/Yearly" component={Yearly} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
