Date.prototype.getWeek = function (dowOffset) {
  /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

  dowOffset = typeof (dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
  var newYear = new Date(this.getFullYear(), 0, 1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = (day >= 0 ? day : day + 7);
  var daynum = Math.floor((this.getTime() - newYear.getTime() -
    (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      nYear = new Date(this.getFullYear() + 1, 0, 1);
      nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      /*if the next year starts before the middle of
        the week, it is week #1 of that year*/
      weeknum = nday < 4 ? 1 : 53;
    }
  }
  else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
};

//code start

let dateArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let today = new Date();
let now = today;
let year = now.getFullYear().toString();
let month = (now.getMonth() + 1).toString();
let week = now.getWeek().toString();
let date = year + '-' + month + '-' + now.getDate();

const app = {
  // loginUrl: 'http://15.164.232.40:3001/user',
  // goalsUrl: 'http://15.164.232.40:3001/plans/goals',
  // schedulesUrl: 'http://15.164.232.40:3001/plans/schedules',
  
  
  init: () => {
    chrome.browserAction.setBadgeText({ text: today.getDate().toString() + ' ' + dateArr[today.getDay()] });
    //console.log(localStorage.getItem('isLogin'));
    if (parseInt(localStorage.getItem('isLogin'))) {  //로그인이 된 경우
      //schedule info
      app.renderDayPage();
      //fetch goals, schedules
      //버튼 이벤트 -> 일정 추가  (팝업)
      app.addCreateHandelers();
      //버튼 이벤트 -> 일정 수정  (팝업)
      //버튼 이벤트 -> 일정 체크 
      //버튼 이벤트 -> 일정 삭제
      app.addDeleteGoalHandelers();  
      // app.addDeleteScheduleHandelers();
      //버튼 이벤트 -> 로그아웃
      app.addLogoutHandelers();
    } else {  //로그인이 안된 경우
      //login page
      app.renderLoginPage();
      //버튼 추가 -> 회원가입 페이지(팝업)
      app.addUserHandelers();
      app.addLoginHandlers();
      //fetch 로그인
      //local storage => state만 저장할 것인가 vs token을 저장할 것인가
    }

  },
  addLoginHandlers: () => { //로그인 핸들러, '로그인'버튼 클릭시 실행
    let submitBtn = document.getElementById('submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let data = {  //입력한 정보
          email: document.getElementById('name').value,
          password: document.getElementById('password').value
        }
        app.fetchLogin(data);
        app.renderDayPage();
      });
    }
  },
  addLogoutHandelers: () => { //로그아웃 핸들러
    let logoutBtn = document.getElementById('logout');
    if(logoutBtn){
      logoutBtn.addEventListener('click', e => {
        localStorage.setItem('isLogin', 0);
        app.renderLoginPage();
      })
    }
  },
  addUserHandelers: () => { //회원가입 핸들러 => 클릭시 팝업
    //popup -> window.open("html ", "name", "size")
    let signupBtn = document.getElementById('signup');
    if(signupBtn){
      signupBtn.addEventListener('click', e => {
        window.open('./userPopup.html', 'signup', "width=500, height=400, left=200, top=50");
      });
    }
  },
  addCreateHandelers: () => { //일정생성 핸들러 => 클릭시 팝업
    let makeBtn = document.getElementById('makeup');
    console.log(makeBtn);
    if(makeBtn){
      makeBtn.addEventListener('click', e => {
        window.open('./makePlan.html', 'make plan', "width=500, height=400, left=200, top=50");
      });
    }
  },
  addDeleteGoalHandelers: () => { //목표삭제 핸들러  ////class이름으로 접근하여 여러 요소에 접근, 개개인마다 이벤트 리스너 달아줌
    window.addEventListener("load", function(e) {
      let deleteBtn = document.getElementsByClassName('goal_delete');
      console.log(deleteBtn, deleteBtn.length);
      for(let i = 0; i < deleteBtn.length; i++){
        console.log(deleteBtn[i]);
      }
    });
    
    // let deleteBtn = document.getElementsByClassName('goal_delete');
    
    // console.log(deleteBtn)
    // console.log(deleteBtn.length)
    // for(let i = 0; i < deleteBtn.length; i++){
    //   console.log(deleteBtn[i])

    //   deleteBtn[i].addEventListener('click', e => {
    //     console.log('==')
    //     console.log(e)
    //     console.log(this.id);
    //   })
    // }
  },
  // addDeleteScheduleHandelers: () => { //일정삭제 핸들러
  //   let deleteBtn = document.getElementsByClassName('schedule_delete');
  //   if(deleteBtn){
  //     deleteBtn.addEventListener('click', e => {
  //       console.log('==');
  //       console.log(e.value);
  //       console.log(e);
  //     })
  //   }
  // },
  fetchLogin: data => {
    console.log(data);
    fetch('http://15.164.232.40:3001/user/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      }).then(res => {  //페이지 다시 로딩
        if (res.status === 200) {
          localStorage.setItem('isLogin', 1);
        } else {
          alert('로그인이 실패되었습니다.')
          localStorage.setItem('isLogin', 0);
          app.renderLoginPage();
        }
      }).catch(err => {
        console.log(err);
      });
  },
  fetchGoalsGet: ({category, year, day}, callback) => { //get from goals
    if(!day){
      window
      .fetch(`http://15.164.232.40:3001/plans/goals/get?category=${category}&year=${year}`)
      .then(resp => { //제대로 값을 받아오지 못한경우 실행
        if(resp.status !== 200){
          localStorage.setItem('isLogin', 0);
          alert('session out1');
        }
        return resp.json();
      })
      .then(callback);
    } else {
      window
      .fetch(`http://15.164.232.40:3001/plans/goals/get?category=${category}&year=${year}&day=${day}`)
      .then(resp => { //제대로 값을 받아오지 못한경우 실행
        if(resp.status !== 200){
          localStorage.setItem('isLogin', 0);
          alert('session out1');
        }
        return resp.json();
      })
      .then(callback);
    }
  },
  fetchSchedulesGet: (date, callback) => {  //get from schedules
    window
      .fetch(`http://15.164.232.40:3001/plans/schedules/get?date=${date}`)
      .then(resp => {
        if(resp.status !== 200){
          localStorage.setItem('isLogin', 0);

        }
        return resp.json();
      })
      .then(callback);
  },
  goalsTmpl: (goal) => {  //목표 템플릿
    let goals = document.createElement('p');
    goals.className = 'goal';
    if(goal.is_done){ //목표 달성한 경우
      goals.innerHTML = `
<li class="lists_title"> 
<span>
  <del> ${goal.name} </del>
  </span>
  <span>
  <input type="checkbox" checked>
</span>
<span>
  <img src="./trash.png" alt="Delete" class="goal_delete" id=${goal.id} width="17" height="17">
</span>
</li>
`//해당 버튼 클릭시 -> 버튼의 id값 === 글의 id값 -> onclick사용 ..?
    } else {  //목표 아직 달성 안한 경우
      goals.innerHTML = `
<li class="lists_title"> 
<span>
  ${goal.name}
  </span>
  <span>
  <input type="checkbox">
</span>
<span>
  <img src="./trash.png" alt="Delete" class="goal_delete" id=${goal.id} width="17" height="17">
</span>
</li>
`
    }
    return goals;
  },
  plansTmpl: (plan) => {  //일정 템플릿
    let plans = document.createElement('p');
    plans.className = 'plan';
    console.log(plan.is_done);
    if(plan.is_done){
      plans.innerHTML = `
    <li>
<span class="lists_title"> 
  <del> ${plan.name} </del>
</span>
<span>
  <input type="checkbox"  checked>
</span>
<span>
  <button type="submit" class="schedule_delete">
    <img src="./trash.png" alt="Delete" width="17" height="17">
  </button>
</span>
<ul>
  <li> start time: ${plan.start} </li>
  <li> end time: ${plan.end} </li>
</ul>
</li>
`
    } else {
      plans.innerHTML = `
    <li>
<span class="lists_title"> 
  ${plan.name}
</span>
<span>
  <input type="checkbox">
</span>
<span>
  <button type="submit" class="schedule_delete">
    <img src="./trash.png" alt="Delete" width="17" height="17">
  </button>
</span>
<ul>
  <li> start time: ${plan.start} </li>
  <li> end time: ${plan.end} </li>
</ul>
</li>
`
    }
    return plans;
  },
  renderDayPage: () => { //일정 페이지 렌더링
    //화면전환 로그인 => 일정
    document.getElementById('login_area').style.display = 'none';
    document.getElementById('info_area').style.display = 'block';

    app.fetchGoalsGet({category: 'annually', year: year, day: null}, (data) => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        document.getElementById('annually_goals').appendChild(app.goalsTmpl(data[i]));
      }
    });
    app.fetchGoalsGet({category: 'monthly', year: year, day: month}, (data) => {
      for (let i = 0; i < data.length; i++) {
        document.getElementById('month_goals').appendChild(app.goalsTmpl(data[i]));
      }
    });
    app.fetchGoalsGet({category: 'weekly', year: year, day: week}, (data) => {
      for (let i = 0; i < data.length; i++) {
        document.getElementById('weekly_goals').appendChild(app.goalsTmpl(data[i]));
      }
    });
    app.fetchSchedulesGet(date, (data) => {
      for (let i = 0; i < data.length; i++) {
        document.getElementById('schedules').appendChild(app.plansTmpl(data[i]));
      }
    });

    document.getElementById('year').innerText = year + '년';
    document.getElementById('month').innerText = month + '월';
    document.getElementById('week').innerText = week + '주';
    document.getElementById('today').innerText = date;
  },
  renderLoginPage: () => { //일정 페이지 렌더링
    //화면전환 일정X => 로그인 만
    document.getElementById('info_area').style.display = 'none';
    document.getElementById('login_area').style.display = 'block';
  },
};

app.init();
