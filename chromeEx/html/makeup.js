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

const mup = {
  init: () => {
    console.log('==');

    //select의 값에 따라 보이는 것을 다르게, 먼저 블럭 처리 
    document.getElementById('schedules_area').style.display = 'none';
    document.getElementById('annually_goals_area').style.display = 'none';
    document.getElementById('month_goals_area').style.display = 'none';
    document.getElementById('weekly_goals_area').style.display = 'none';

    mup.addSelectHandlers();
  },
  addSelectHandlers: () => { //로그인 핸들러, '로그인'버튼 클릭시 실행
    let selected = document.getElementById('mode');
    let today = new Date();

    function pad(n, width) {
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    let year = today.getFullYear();
    let month = today.getMonth() + 1;

    selected.addEventListener('change', (e) => {
      // console.log(selected.options[selected.selectedIndex].value);
      let op = selected.options[selected.selectedIndex].value;

      if (op === 'schedules') {
        //화면 전환
        document.getElementById('schedules_area').style.display = 'block';
        document.getElementById('annually_goals_area').style.display = 'none';
        document.getElementById('month_goals_area').style.display = 'none';
        document.getElementById('weekly_goals_area').style.display = 'none';
        //포멧 설정
        document.getElementById('schedule_start').value = today.getHours() + 1 + ':00';
        document.getElementById('schedule_end').value = today.getHours() + 2 + ':00';
        document.getElementById('schedule_date').value = year + '-' + pad(month, 2) + '-' + pad(today.getDate(), 2);

        mup.handleScheduleSubmit();

      } else if (op === 'annually_goals') {
        //화면 전환
        document.getElementById('annually_goals_area').style.display = 'block';
        document.getElementById('schedules_area').style.display = 'none';
        document.getElementById('month_goals_area').style.display = 'none';
        document.getElementById('weekly_goals_area').style.display = 'none';
        //포멧 설정
        document.getElementById('annually_year').value = year;
        
        mup.handleAnnuallySubmit();
      } else if (op === 'month_goals') {
        //화면 전환
        document.getElementById('month_goals_area').style.display = 'block';
        document.getElementById('schedules_area').style.display = 'none';
        document.getElementById('annually_goals_area').style.display = 'none';
        document.getElementById('weekly_goals_area').style.display = 'none';

        //포멧 설정
        document.getElementById('monthly_date').value = year + '-' + pad(month, 2);

        mup.handleMonthlySubmit();
      } else if (op === 'weekly_goals') {
        //화면 전환
        document.getElementById('weekly_goals_area').style.display = 'block';
        document.getElementById('schedules_area').style.display = 'none';
        document.getElementById('annually_goals_area').style.display = 'none';
        document.getElementById('month_goals_area').style.display = 'none';

        //포멧 설정
        document.getElementById('weekly_date').value = year + '-' + pad(month, 2) + '-' + pad(today.getDate(), 2);

        mup.handleWeeklySubmit();
      }
    });
  },
  handleScheduleSubmit: () => { //schedules
    let data;
    document.getElementById('schedule_submit').addEventListener('click', () => {
      data = {
        name: document.getElementById('schedule_name').value,
        start: document.getElementById('schedule_start').value,
        end: document.getElementById('schedule_end').value,
        date: document.getElementById('schedule_date').value
      }

      mup.fetchSchedulesPost(data);
    });
    //입력받은 데이터 fetch
  },
  handleAnnuallySubmit: () => { //annually
    let data;
    document.getElementById('annually_submit').addEventListener('click', () => {
      data = {
        category: "annually",
        name: document.getElementById('annually_name').value,
        year: document.getElementById('annually_year').value
      }

      mup.fetchGoalsPost(data);
    });
    //입력받은 데이터 fetch
  },
  handleMonthlySubmit: () => { //monthly
    let data;
    document.getElementById('monthly_submit').addEventListener('click', () => {
      data = {
        category: "monthly",
        name: document.getElementById('monthly_name').value,
        year: new Date(document.getElementById('monthly_date').value).getFullYear(),
        day: new Date(document.getElementById('monthly_date').value).getMonth() + 1
      }

      mup.fetchGoalsPost(data);
    });
    //입력받은 데이터 fetch
  },
  handleWeeklySubmit: () => { //weekly
    let data;
    document.getElementById('weekly_submit').addEventListener('click', () => {
      data = {
        category: "weekly",
        name: document.getElementById('weekly_name').value,
        year: new Date(document.getElementById('weekly_date').value).getFullYear(),
        day:new Date(document.getElementById('weekly_date').value).getWeek(),
      }

      mup.fetchGoalsPost(data);
    });
    //입력받은 데이터 fetch
  },
  fetchSchedulesPost: (data) => { //make schedules
    window
      .fetch(`http://15.164.232.40:3001/plans/schedules/post`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      })
      .then(resp => {
        if (resp.status !== 201) {
          alert('잘못된 접근입니다');
        } else {
          alert('생성되었습니다.');
        }
      });
  },
  fetchGoalsPost: (data) => { //make goals
    window
      .fetch(`http://15.164.232.40:3001/plans/goals/post`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      })
      .then(resp => {
        if (resp.status !== 201) {
          alert('잘못된 접근입니다');
        } else {
          alert('생성되었습니다.');
          self.close();
        }
      });
  }
}

mup.init();
