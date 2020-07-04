import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Calendar from "./Components/Calendar";
import WiseSaying from "./Components/WiseSaying";
import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div className="listBts">
            <div id="list">Day.Life</div>
            <Link to="/">
              <button className="listBt">Home</button>
            </Link>
            <Link to="/login">
              <button className="listBt">Login</button>
            </Link>
            <Link to="/signup">
              <button className="listBt">Sign Up</button>
            </Link>
            <Link to="/wisesaying" id="wisesayingBt">
              <button className="listBt">For My Time</button>
            </Link>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/wisesaying" component={WiseSaying} />
            <Route path="/calendar" component={Calendar} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function NotFound() {
  return (
    <div>
      <div>잘못된 경로 입니다.</div>
      <h1>Not Found</h1>
    </div>
  );
}
