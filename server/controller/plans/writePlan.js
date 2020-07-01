const { user } = require('../../modules');
const { calender } = require('../../models');
const { interm_check } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  post: (req, res) => {
    let name = req.body.name;
    let start = req.body.start;
    let end = req.body.end;
    let is_repeat = req.body.is_repeat
    let interm = req.body.interm;  //interm_check arr
    
    let category = req.params.category;   //Path Params
    let token = req.cookies.token; //cookie

    if (!token) {  //토큰이 없는 경우
      res.status(401);
      res.json({ 'message': 'need user session' });
      res.end();
    } else {
      let decoded = jwt.verify(token, process.env.SECRET_KEY) //export SECRET_KEY='urSecretKey'
      //변경 필요, 어떻게 값이 넘어오는지 중요
      let userId = decoded.userid;

      user.find({ where: { id: userId } })
        .then(data => {
          if (!data) {  //세션에 저장된 정보가 DB에 없는 경우
            res.status(401);
            res.json({ 'message': 'need user session' });
            res.end();
          } else {    //세션에 저장된 정보가 DB에 있는 경우, 일정 추가
            //calenders와 interm_check에 지정 데이터 추가 필요, orm사용
            //1. calendars table에 삽입
            //2. 위 삽입된 데이터의 id와 함께 interm_checks table에 삽입
            calender.create({
              category: category,
              name: name,
              start: start,
              end: end,
              is_repeat: is_repeat,
              is_done: false,
              user_id: userId
            }).then(data => {
              for (let i = 0; i < interm.length; i++) {
                interm_check.create({ alarm_time: interm[i], calender_id: data.id });
              }
            });

            //성공한 경우
            res.status(201);
            res.json({ "message": "success" });
            res.end();
          }
        });
    }
  }
};
