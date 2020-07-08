// YOUR CODE HERE:

let dateArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let today = new Date();
let now = today;
let year = now.getFullYear().toString();
let month = (now.getMonth() + 1).toString();
let week = now.getWeek().toString();

const app = {
  // loginUrl: 'http://15.164.232.40:3001/user',
  // goalsUrl: 'http://15.164.232.40:3001/plans/goals',
  // schedulesUrl: 'http://15.164.232.40:3001/plans/schedules',
  
  date: year + '-' + month + '-' + now.getDate(),
  init: () => {
    chrome.browserAction.setBadgeText({ text: today.getDate().toString() + ' ' + dateArr[today.getDay()] });
    if (localStorage.getItem('isLogin')) {
      //schedule info
      //fetch goals, schedules
      //버튼 이벤트 -> 일정 추가  (팝업)
      //버튼 이벤트 -> 일정 수정  (팝업)
      //버튼 이벤트 -> 일정 체크 
      //버튼 이벤트 -> 일정 삭제  
      app.renderDayPage();
    } else {
      //login page
      app.renderLoginPage();
      //버튼 추가 -> 회원가입 페이지(팝업)
      app.addLoginHandlers();
      //fetch 로그인
      //local storage => state만 저장할 것인가 vs token을 저장할 것인가
    }

    app.fetch(json => {
      json.forEach(app.renderMessage);
    });
  },
  addLoginHandlers: () => { //로그인 핸들러, '로그인'버튼 클릭시 실행
    // let submit = document.querySelector('#send .submit');
    let submitBtn = document.getElementById('submit');
    if (submitBtn) {
      submit.addEventListener('submit', (e) => {
        e.preventDefault();
        let data = {  //입력한 정보
          email: document.getElementById('name').value,
          password: document.getElementById('password').value
        }
        app.fetchLogin(data);
      });
    }
  },
  addUserHandelers: () => {

  },
  fetchLogin: data => {
    window
      .fetch('http://15.164.232.40:3001/user/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      }).then(res => {  //페이지 다시 로딩
        if (res.status === 200) {
          localStorage.setItem('isLogin', true);
          app.init(); //?
        } else {
          alert('로그인이 실패되었습니다.')
          localStorage.setItem('isLogin', false);
          app.init(); //?
        }
      }).catch(err => {
        console.log(err);
      });
  },
  fetchGoalsGet: ({category, year, day}, callback) => { //get from goals
    window
      .fetch(`http://15.164.232.40:3001/plans/goals/get?category=${category}&year=${year}&day=${day}`)
      .then(resp => { //제대로 값을 받아오지 못한경우 실행
        if(resp.status !== 200){
          localStorage.setItem('isLogin', false);
          app.init(); //?
        }
        return resp.json();
      })
      .then(callback);
  },
  fetchSchedulesGet: (date, callback) => {  //get from schedules
    window
      .fetch(`http://15.164.232.40:3001/plans/schedules/get?date=${date}`)
      .then(resp => {
        if(resp.status !== 200){
          localStorage.setItem('isLogin', false);
          app.init(); //?
        }
        return resp.json();
      })
      .then(callback);
  },
  // fetchPut: callback => {
  //   window
  //     .fetch(app.server)
  //     .then(resp => {
  //       return resp.json();
  //     })
  //     .then(callback);
  // },
  // fetchDelete: callback => {
  //   window
  //     .fetch(app.server)
  //     .then(resp => {
  //       return resp.json();
  //     })
  //     .then(callback);
  // },
  // send: (data, callback) => {
  //   window
  //     .fetch(app.server, {
  //       method: 'POST',
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(resp => {
  //       return resp.json();
  //     })
  //     .then(callback);
  // },
  goalsTmpl: (goal) => {  //됬는지 안됬는지 판단 필요
    let goals = document.createElement('p');
    goals.className = 'goal';
    goals.innerHTML = `
<li class="lists_title"> 
<span>
  ${goal.name}
  </span>
  <span>
  <input type="checkbox">
</span>
<span>
  <img src="./trash.png" alt="Delete" width="17" height="17">
</span>
</li>
`
    return goals;
  },
  plansTmpl: (plan) => {  //40번째와 동일, is_done의 값을 판단하여 checked요소 여부결정
    let plans = document.createElement('p');
    plans.className = 'plan';
    plans.innerHTML = `
    <li>
<span class="lists_title"> 
  ${plan.name}
</span>
<span>
  <input type="checkbox"  checked>
</span>
<span>
  <img src="./trash.png" alt="Delete" width="17" height="17">
</span>
<ul>
  <li> start time: ${plan.start} </li>
  <li> end time: ${plan.end} </li>
</ul>
</li>
`
  },
  renderDayPage: () => { //일정 페이지 렌더링
    //화면전환 로그인 => 일정
    document.getElementById('login_area').style.display = 'none';
    document.getElementById('info_area').style.display = 'block';

    app.fetchGoalsGet({category: 'annually', year: app.year, day: null}, (data) => {
      for (let i = 0; i < data.length; i++) {
        document.getElementById('annually_goals').appendChild(app.plansTmpl(data[i]));
      }
    });
    app.fetchGoalsGet({category: 'monthly', year: app.year, day: app.month}, (data) => {
      for (let i = 0; i < data.length; i++) {
        document.getElementById('month_goals').appendChild(app.plansTmpl(data[i]));
      }
    });
    app.fetchGoalsGet({category: 'weekly', year: app.year, day: app.week}, (data) => {
      for (let i = 0; i < data.length; i++) {
        document.getElementById('weekly_goals').appendChild(app.plansTmpl(data[i]));
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


// function login() {
//   document.getElementById('info_area').style.display = 'none';
//   document.getElementById('login_area').style.display = 'block';

//   let submitBtn = document.getElementById('submit');

//   submitBtn.addEventListener('click', function (e) {
//     e.preventDefault();

//     let data = {
//       email: document.getElementById('name').value,
//       password: document.getElementById('password').value
//     }

//     console.log(data);
//     //fetch로그인 구현

//     fetch('http://15.164.232.40:3001/user/signin', {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//       },
//       body: JSON.stringify(data)
//     }).then(res => {  //페이지 다시 로딩
//       if (res.status === 200) {
//         console.log(res);
//         print();
//         //window.location.reload(true);
//       } else {
//         alert('로그인이 실패되었습니다.')
//       }
//     }).catch(err => {
//       console.log(err);
//     });
//   });
// }

// function print() {
//   document.getElementById('login_area').style.display = 'none';
//   document.getElementById('info_area').style.display = 'block';

//   //const getApi = require('./getApi');

//   //출력
//   let today = new Date();

//   let year = today.getFullYear().toString();
//   let month = (today.getMonth() + 1).toString();
//   let week = today.getWeek().toString();
//   let date = year + '-' + month + '-' + today.getDate();

//   fetch(`http://15.164.232.40:3001/plans/schedules/get?date=${date}`, {
//     method: 'GET'
//   }).then(res => res.json())
//     .then(async data => {
//       console.log(data);
//       for (let i = 0; i < data.length; i++) {
//         await document.getElementById('schedules').appendChild(plansTmpl(data[i]));
//       }
//     });

//   fetch(`http://15.164.232.40:3001/plans/goals/get?category=annually&year=${year}}`, {
//     method: 'GET'
//   }).then(res => res.json())
//     .then(async data => {
//       console.log(data);
//       for (let i = 0; i < data.length; i++) {
//         await document.getElementById('annually_goals').appendChild(goalsTmpl(data[i]));
//       }
//     });
//   fetch(`http://15.164.232.40:3001/plans/goals/get?category=monthly&year=${year}&day=${month}`, {
//     method: 'GET'
//   }).then(res => res.json())
//     .then(async data => {
//       console.log(data);
//       for (let i = 0; i < data.length; i++) {
//         await document.getElementById('month_goals').appendChild(goalsTmpl(data[i]));
//       }
//     });
//   fetch(`http://15.164.232.40:3001/plans/goals/get?category=weekly&year=${year}&day=${week}`, {
//     method: 'GET'
//   }).then(res => res.json())
//     .then(async data => {
//       console.log(data);
//       for (let i = 0; i < data.length; i++) {
//         await document.getElementById('weekly_goals').appendChild(goalsTmpl(data[i]));
//       }
//     });



//   //목표 템플릿
//   //체크박스 추가
//   function goalsTmpl(goal) {
//     let goals = document.createElement('p');
//     goals.className = 'goal';
//     goals.innerHTML = `
// <li class="lists_title"> 
// <span>
//   ${goal.name}
//   </span>
//   <span>
//   <input type="checkbox">
// </span>
// <span>
//   <img src="./trash.png" alt="Delete" width="17" height="17">
// </span>
// </li>
// `
//     return goals;
//   }

//   //일정 템플릿
//   //체크 박스 추가 -> 글의 is_done속성에 따라 체크 여부 변경
//   //체크 박스 토글시 -> put 메소드 호출, is_done변경

//   function plansTmpl(plan) {
//     let plans = document.createElement('p');
//     plans.className = 'plan';
//     plans.innerHTML = `
//     <li>
// <span class="lists_title"> 
//   ${plan.name}
// </span>
// <span>
//   <input type="checkbox"  checked>
// </span>
// <span>
//   <img src="./trash.png" alt="Delete" width="17" height="17">
// </span>
// <ul>
//   <li> start time: ${plan.start} </li>
//   <li> end time: ${plan.end} </li>
// </ul>
// </li>

// `
//     return plans;
//   }

//   document.getElementById('year').innerText = year + '년';
//   document.getElementById('month').innerText = month + '월';
//   document.getElementById('week').innerText = week + '주';
//   document.getElementById('today').innerText = date;
// }

// function script(){
//   if (!localStorage.getItem('token_daylife')) {
//     login();
//   } else {
//     print();
//   }
// }

// let dateArr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// // chrome.browserAction.setBadgeText({ text: new Date().getDate().toString() });
// chrome.browserAction.setBadgeText({ text: new Date().getDate().toString() + ' ' + dateArr[new Date().getDay()]});
// script();
