Date.prototype.getWeek = function (dowOffset) {

  dowOffset = typeof (dowOffset) == 'int' ? dowOffset : 0;
  var newYear = new Date(this.getFullYear(), 0, 1);
  var day = newYear.getDay() - dowOffset; 
  day = (day >= 0 ? day : day + 7);
  var daynum = Math.floor((this.getTime() - newYear.getTime() -
    (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
  var weeknum;
 
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      nYear = new Date(this.getFullYear() + 1, 0, 1);
      nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      weeknum = nday < 4 ? 1 : 53;
    }
  }
  else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
};

//code start

// let dateArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// let dateArr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
let dateArr = ['일', '월', '화', '수', '목', '금', '토']

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

////*******변경사항 -> 1일 -> 01일 */
let today = new Date();
let now = today;
let year = now.getFullYear().toString();
let month = (now.getMonth() + 1).toString();
let week = now.getWeek().toString();
let date = year + '-' + pad(month,2) + '-' + pad(now.getDate(),2);

const app = {  
  init: () => {
    chrome.browserAction.setBadgeText({ text: today.getDate().toString() + ' ' + dateArr[today.getDay()] });
    //console.log(localStorage.getItem('isLogin'));
    if (parseInt(localStorage.getItem('isLogin'))) {  //로그인이 된 경우
      //schedule info
      app.renderDayPage();
      //fetch goals, schedules
      //버튼 이벤트 -> 일정 추가  (팝업)
      app.addCreateHandelers();
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
        alert('로그아웃되었습니다.');
        app.renderLoginPage();
      })
    }
  },
  addUserHandelers: () => { //회원가입 핸들러 => 클릭시 팝업
    //popup -> window.open("html ", "name", "size")
    let signupBtn = document.getElementById('signup');
    if(signupBtn){
      signupBtn.addEventListener('click', e => {
        window.open('./html/userPopup.html', 'signup', "width=500, height=400, left=200, top=50");
      });
    }
  },
  addCreateHandelers: () => { //일정생성 핸들러 => 클릭시 팝업
    let makeBtn = document.getElementById('makeup');
    // console.log(makeBtn);
    if(makeBtn){
      makeBtn.addEventListener('click', e => {
        window.open('./html/makePlan.html', 'make plan', "width=500, height=400, left=200, top=50");
      });
    }
  },
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
  fetchGoalsDel: (id) => { //get from goals
    window
    .fetch(`http://15.164.232.40:3001/plans/goals/delete?id=${id}`,{
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    .then(resp => { 
      if(resp.status !== 200){
        alert('잘못된 접근입니다');
      } else {
        alert('성공적으로 삭제되었습니다.');
        app.renderDayPage();
      }
    });
  },
  fetchSchedulesCheck: (id, is_done) => { //get from schedules, 체크박스용
    window
    .fetch(`http://15.164.232.40:3001/plans/schedules/put?id=${id}`,{
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({is_done: !is_done})
    })
    .then(resp => { 
      if(resp.status !== 201){
        alert('잘못된 접근입니다');
      } else {
        app.renderDayPage();
      }
    });
  },
  fetchGoalsCheck: (data) => { //get from goals, 체크박스용
    window
    .fetch(`http://15.164.232.40:3001/plans/goals/put?id=${data.id}`,{
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        category: data.category,
        name: data.name,
        year: data.year,
        day: data.day,
        is_done: !data.is_done
      })
    })
    .then(resp => { 
      if(resp.status !== 201){
        alert('잘못된 접근입니다');
      } else {
        app.renderDayPage();
      }
    });
  },
  fetchSchedulesDel: (id) => { //get from schedules
    window
    .fetch(`http://15.164.232.40:3001/plans/schedules/delete?id=${id}`,{
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    .then(resp => { 
      if(resp.status !== 200){
        alert('잘못된 접근입니다');
      } else {
        alert('성공적으로 삭제되었습니다.');
        app.renderDayPage();
      }
    });
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
<li class="lists_title" id=${goal.id}> 
<span>
  <del> ${goal.name} </del>
</span>
<span>
  <input type="checkbox" checked>
</span>
<span>
  <img src="./edit.png" alt="edit" class="goal_delete" width="17" height="17">
</span>
<span>
  <img src="./trash.png" alt="Delete" class="goal_delete" width="17" height="17">
</span>
</li>
`//해당 버튼 클릭시 -> 버튼의 id값 === 글의 id값 -> onclick사용 ..?
    } else {  //목표 아직 달성 안한 경우
      goals.innerHTML = `
<li class="lists_title" id=${goal.id}> 
<span>
  ${goal.name}
</span>
<span>
  <input type="checkbox">
</span>
<span>
  <img src="./edit.png" alt="edit" class="goal_delete" width="17" height="17">
</span>
<span>
  <img src="./trash.png" alt="Delete" class="goal_delete" width="17" height="17">
</span>
</li>
`
    }
    return goals;
  },
  plansTmpl: (plan) => {  //일정 템플릿
    let plans = document.createElement('p');
    plans.className = 'plan';
    // console.log(plan.id);
    if(plan.is_done){
      plans.innerHTML = `
    <li>
<span class="lists_title" id=${plan.id}> 
  <del> ${plan.name} </del>
</span>
<span>
  <input type="checkbox" checked>
</span>
<span>
  <img src="./edit.png" alt="edit" class="goal_delete" width="17" height="17">
</span>
<span>
  <img src="./trash.png" alt="Delete" class="goal_delete" width="17" height="17">
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
<span class="lists_title" id=${plan.id}> 
  ${plan.name}
</span>
<span>
  <input type="checkbox">
</span>
<span>
  <img src="./edit.png" alt="edit" class="goal_delete" width="17" height="17">
</span>
<span>
  <img src="./trash.png" alt="Delete" class="goal_delete" width="17" height="17">
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
  clearDayPage: () => { //일정페이지 재 로딩시 화면 초기화
    document.getElementById('annually_goals').innerHTML = '';
    document.getElementById('month_goals').innerHTML = '';
    document.getElementById('weekly_goals').innerHTML = '';
    document.getElementById('schedules').innerHTML = '';
  },
  renderDayPage: () => { //일정 페이지 렌더링
    //재로딩시 기존 화면 지움
    app.clearDayPage();
    //화면전환 로그인 => 일정
    document.getElementById('login_area').style.display = 'none';
    document.getElementById('info_area').style.display = 'block';

    app.fetchGoalsGet({category: 'annually', year: year, day: null}, (data) => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        let tmpNode = app.goalsTmpl(data[i]);
        document.getElementById('annually_goals').appendChild(tmpNode);
        let gId = tmpNode.childNodes[1].id;

        tmpNode.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', e => {  //체크박스
          console.log("체크박스" + gId);
          //delete와 비슷하게 id받고, is_done받고 fetch실행
          console.log(data[i].is_done)
          app.fetchGoalsCheck(data[i]);
        });
        tmpNode.childNodes[1].childNodes[5].addEventListener('click', e => {  //수정
          console.log("내용 수정" + gId);
          window.open('./html/editPopup.html', 'signup', "width=500, height=400, left=200, top=50"); //수정창 팝업
          //data[i]접근이 가능한지 확인 
        });
        tmpNode.childNodes[1].childNodes[7].addEventListener('click', e => {  //수정
          console.log("내용 삭제" + gId);
          app.fetchGoalsDel(gId);
        });
      }
    });
    app.fetchGoalsGet({category: 'monthly', year: year, day: month}, (data) => {
      for (let i = 0; i < data.length; i++) {
        let tmpNode = app.goalsTmpl(data[i]);
        document.getElementById('month_goals').appendChild(tmpNode);
        let gId = tmpNode.childNodes[1].id;
        // console.log(gId);
        tmpNode.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', e => {  //체크박스
          console.log("체크박스" + gId);
          // app.fetchGoalsCheck(gId, data[i].is_done);
          app.fetchGoalsCheck(data[i]);
        });
        tmpNode.childNodes[1].childNodes[5].addEventListener('click', e => {  //수정
          console.log("내용 수정" + gId);
          window.open('./html/editPopup.html', 'signup', "width=500, height=400, left=200, top=50"); //수정창 팝업

        });
        tmpNode.childNodes[1].childNodes[7].addEventListener('click', e => {  //수정
          console.log("내용 삭제" + gId);
          app.fetchGoalsDel(gId);
        });
      }
    });
    app.fetchGoalsGet({category: 'weekly', year: year, day: week}, (data) => {
      for (let i = 0; i < data.length; i++) {
        let tmpNode = app.goalsTmpl(data[i]);
        document.getElementById('weekly_goals').appendChild(tmpNode);
        let gId = tmpNode.childNodes[1].id;
        // console.log(gId);
        tmpNode.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', e => {  //체크박스
          console.log("체크박스" + gId);
          // app.fetchGoalsCheck(gId, data[i].is_done);
          app.fetchGoalsCheck(data[i]);
        });
        tmpNode.childNodes[1].childNodes[5].addEventListener('click', e => {  //수정
          console.log("내용 수정" + gId);
          window.open('./html/editPopup.html', 'signup', "width=500, height=400, left=200, top=50"); //수정창 팝업

        });
        tmpNode.childNodes[1].childNodes[7].addEventListener('click', e => {  //수정
          console.log("내용 삭제" + gId);
          app.fetchGoalsDel(gId);
        });
      }
    });
    app.fetchSchedulesGet(date, (data) => {
      for (let i = 0; i < data.length; i++) {
        // document.getElementById('schedules').appendChild(app.plansTmpl(data[i]));
        let tmpNode = app.plansTmpl(data[i]);
        document.getElementById('schedules').appendChild(tmpNode);
        // console.log()
        let gId = tmpNode.childNodes[1].childNodes[1].id;
        //console.log(gId);
        tmpNode.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', e => {  //체크박스
          console.log("체크박스" + gId);
          app.fetchSchedulesCheck(gId, data[i].is_done);
        });
        tmpNode.childNodes[1].childNodes[5].addEventListener('click', e => {  //수정
          console.log("내용 수정" + gId);
          window.open('./html/editPopup.html', 'signup', "width=500, height=400, left=200, top=50"); //수정창 팝업

        });
        tmpNode.childNodes[1].childNodes[7].addEventListener('click', e => {  //수정
          console.log("내용 삭제" + gId);
          app.fetchSchedulesDel(gId);
        });
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
