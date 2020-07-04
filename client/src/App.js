import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Title from "./Components/Title";
import Home from "./Components/Home";
import Calendar from "./Components/Calendar";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick = () => {
    this.setState({
      isLogin: true,
    });
  };

  render() {
    const { isLogin } = this.state;
    console.log(isLogin);
    return (
      <div>
        <div className="app">
          <Title />
        </div>
        <Router>
          <div className="listBar">
            <Link to="/">
              <button className="listBt">Home</button>
            </Link>
            <Link to="/login">
              <button className="listBt">Login</button>
            </Link>
            <Link to="/signup">
              <button className="listBt">Sign Up</button>
            </Link>

            <Switch>
              {/* 404 에러 처리 주석 확인 */}
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/calendar" component={Calendar} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

//404 에러 페이지 처리
//Switch
//스위치 컴포넌트를 사용하면 하위에 있는 Route 컴포넌트 중에 매치되는 제일 첫번째
//컴포넌트만 보여주고 그 이후에 나오는 Route 컴포넌트는 매치되더라도 무시됩니다
//따라서 Route 컴포넌트의 순서가 중요하다}

function NotFound() {
  return (
    <div>
      <div>잘못된 경로 입니다.</div>
      <h1>Not Found</h1>
    </div>
  );
}
