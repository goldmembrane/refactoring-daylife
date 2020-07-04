import React from "react";
import Title from "./Title";
import "./Home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div id="home">
        <Title />
        <ol id="text">
          <li className="content">
            오늘을 정신없이 채우다 보고 뒤돌아서 보면, 많은 일정을 소화해낸
            자신을 볼 수 있을 것입니다.
          </li>
          <li className="content">
            하지만 한 해를 시작하면서 세웠던 장기 목표도 함께 달성 중이신가요?
            혹시 다이어리에만 적어두고 잊어버리지는 않으셨나요?
          </li>
          <li className="content">
            그래서 저희는 단기적인 목표 달성과 동시에 장기적인 시각도 잃지 않을
            수 있는 계획관리 어플리케이션 dayLife을 기획했습니다.
          </li>
          <li className="content">
            로그인을 하면 지난 7일간 세웠던 목표들과 그것의 성취도를 그래프로
            보여줘서 다시 한번 동기부여를 시켜줍니다.
          </li>
          <li className="content">
            성취도를 체크한 이후 달력이 로딩되고 오늘 날짜를 선택하면, 오늘의 to
            do list를 만들고 실행할 수 있는 동시에 이번 주, 이번 달, 이번 해의
            목표도 함께 다시 한번 알려줍니다.
          </li>
          <li className="content">
            달력에서 특정 월을 선택하면 4주 단위로 계획한 세부목표, 마감기한을
            정해두지 않은 이 달의 목표, 이번 해의 목표도 다시 한번 알려줍니다.
          </li>
        </ol>
      </div>
    );
  }
}
