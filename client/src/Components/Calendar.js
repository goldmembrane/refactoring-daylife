import React from "react";

export default class Calendar extends React.Component {
  render() {
    const isLogin = this.props.isLogin;
    console.log("캘린더의 isLogin:", isLogin);
    console.log("캘린더의 디스 프롭:", this.props);
    return isLogin ? (
      <h1 id="calrendar">이곳에 병현님 대표 캘린더를 랜더해준다</h1>
    ) : (
      <h1>Not Found</h1>
    );
  }
}
