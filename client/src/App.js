import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Calendar from "./Components/Calendar";
import WiseSaying from "./Components/WiseSaying";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false, // 처음에는 로그인 안되어있음
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
    console.log("App.js에서 isLogin값은? ::", isLogin);
    return (
      <div>
        <Router>
          <div id="main-buttons">
            <div id="list-title">Day.Life</div>
            <Link to="/">
              <button className="router-button">Home</button>
            </Link>
            <Link to="/login">
              <button className="router-button" onClick={this.handleLogout}>
                {isLogin ? "Logout" : "Login"}
              </button>
            </Link>
            <Link to="/signup">
              <button className="router-button">Sign Up</button>
            </Link>
            <Link to="/wisesaying" id="wisesayingBt">
              <button className="router-button">For My Time</button>
            </Link>
            {/* <Link to="/calendar">
              <button className="router-button">캘린더</button>
            </Link> */}
          </div>
          <Switch>
            <Route
              path="/calendar"
              render={() => <Calendar isLogin={isLogin} />}
            />
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={() => (
                <Login isLogin={isLogin} handleLogin={this.handleLogin} />
              )}
            />
            <Route path="/signup" component={Signup} />
            <Route path="/wisesaying" component={WiseSaying} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
