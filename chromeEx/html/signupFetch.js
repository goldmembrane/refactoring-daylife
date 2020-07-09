const sup = {
  init: () => {
    sup.addSignUpHandlers();
    console.log('==')
  },
  addSignUpHandlers: () => { //로그인 핸들러, '로그인'버튼 클릭시 실행
    let submitBtn = document.getElementById('submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let data = {  //입력한 정보
          email: document.getElementById('name').value,
          password: document.getElementById('password').value,
          username: document.getElementById('username').value
        }
        sup.fetchSingUp(data);
        //부모페이지 이동 or페이지 닫기
      });
    }
  },
  fetchSingUp: data => {
    console.log(data);
    fetch('http://15.164.232.40:3001/user/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      }).then(res => {  //페이지 다시 로딩
        if (res.status === 200) {
          alert('회원가입이 성공하였습니다.');
          self.close();
        } else if (res.status === 409) {
          alert('이미 존재하는 이메일입니다.');
          self.close();
        } else {
          alert('회원가입이 실패되었습니다.');
        }
      }).catch(err => {
        console.log(err);
      });
  },
}

sup.init();
