import React from "react";
import "./Home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div id="main-home-page">
        <ol id="main-text">
          <li className="content">오늘 하루를 열심히 살아낸 당신.</li>
          <li className="content">
            혹시 오늘만을 살다보니 매 해, 매 월의 시작에 계획했던 목표들이
            잊혀지고 있지 않나요?
          </li>
          <li className="content">dayLife는 오늘과 이번 주의 계획과 함께</li>
          <li className="content">
            이번 달, 이번 해의 목표가 한 화면에 표시되어
          </li>
          <li className="content">
            단기적인 계획과 장기적인 목표의 달성을 함께 도와줍니다.
          </li>
          <li className="content">dayLife로 day와 Life를 함께 잡아보세요!</li>
        </ol>
      </div>
    );
  }
}
