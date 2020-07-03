const { daily_schedules } = require('../../models');

const jwt = require('jsonwebtoken');

const getEndWeekDays = require('./getFirstdayOfWeek');

/**
 * memo
 * 유저 인증 코드가 반복됨
 */

module.exports = {
  get: (req, res) => {  //get 7일치(무조건)
    let token = req.cookies.token;
    if(!token){
      res.status(401);
      res.json({'message':'need user session'});
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET);
      // let [year, month, day] = req.body.date.split('-');  //year-month-day
      // let today = new Date(year + '-' + month + '-' + day);

      
      // let resData = {
      //   sun:[], mon:[], tue:[], wed:[], thu:[], fri:[], sat:[]
      // }

      // //new Date(year + '-' + month + '-' + (day - 1 + i)) <= data <= new Date(year + '-' + month + '-' + (day + i))      
      // //확인 필요 sequelize에 datetime형식이 어떤 포멧인지 확인하고 그에 맞는 쿼리문 필요
      // for(let i = 0; i < 7; i++){ 
      //   await users.findAll({ where: {}})
      // }

      // res.status(200);
      // res.json(resData);
      // res.end();


      daily_schedules.findAll({ where: {
        user_id: userId, 
        date: {between: getEndWeekDays(new Date(req.body.date))}
      }}).then(data => {
        res.status(200);
        res.json(data);
        res.end();
      });
    }
  },
  post: (req, res) => {
    let token = req.cookies.token;
    if(!token){
      res.status(401);
      res.json({'message':'need user session'});
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET);
      let name = req.body.name;
      let date = req.body.date;
      let start = req.body.start;
      let end = req.body.end;
      let is_done = false;

      daily_schedules.create({
        name: name,
        date: date,
        start: start,
        end: end,
        is_done: is_done,
        user_id: userId
      }).then(() => {
        res.status(201);
        res.json({"message": "success"});
        res.end();
      });
    }
  },
  put: (req, res) => {
    let token = req.cookies.token;
    if(!token){
      res.status(401);
      res.json({'message':'need user session'});
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET);
      let id = req.body.id;
      let name = req.body.name;
      let date = req.body.date;
      let start = req.body.start;
      let end = req.body.end;
      let is_done = req.body.is_done;

      daily_schedules.findOne({where: {id: id, user_id: userId}}).then(data => {
        if(!data) {
          res.status(404);
          res.json({"message":"cannot found"});
          res.end();
        }
      });

      daily_schedules.update({
        name: name,
        date: date,
        start: start,
        end: end,
        is_done: is_done
      }, {where: {id: id}}).then(() => {
        res.status(201);
        res.json({"message": "success"});
        res.end();
      });
    }
  },
  delete: (req, res) => {
    let token = req.cookies.token;
    if(!token){
      res.status(401);
      res.json({'message':'need user session'});
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET);
      
      daily_schedules.destroy({where: {user_id: userId, id: req.body.id}}).then(() => {
        res.status(200);
        res.json({"message": "success"});
        res.end();
      })
      
    }
  }
};
