// const { daily_schedules } = require('../../__test__/database/models');
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
    if (!token) {
      res.status(401);
      res.json({ 'message': 'need user session' });
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;
      let date = req.query.date;
      // let d = getEndWeekDays(new Date(req.body.date));
      // console.log(userId);
      daily_schedules.findAll({
        where: {
          user_id: userId,
          date: date
        }
      }).then(data => {
        res.status(200);
        res.json(data);
        res.end();
      }).catch(err => {
        res.status(501);
      })
    }
  },
  post: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401);
      res.json({ 'message': 'need user session' });
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;
      let name = req.body.name;
      let date = req.body.date;
      let start = req.body.start;
      let end = req.body.end;
      let is_done = false;

      // console.log(userId+' '+name+' '+date+' '+start+' '+end+' '+is_done);
      
      daily_schedules.create({
        name: name,
        is_done: is_done,
        user_id: userId,
        start: start,
        end: end,
        date: date
      }).then(data => {
        res.status(201);
        res.json({ "message": "success" });
        res.end();
      }).catch(err => {
        res.status(502);
        res.send(err);
      })
    }
  },
  put: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401);
      res.json({ 'message': 'need user session' });
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;
      let id = req.query.id;

      let name = req.body.name;
      let date = req.body.date;
      let start = req.body.start;
      let end = req.body.end;
      let is_done = req.body.is_done;

      daily_schedules.findOne({ where: { id: id, user_id: userId } }).then(data => {
        if (data) {
          daily_schedules.update({
            name: name,
            date: date,
            start: start,
            end: end,
            is_done: is_done
          }, { where: { id: id } }).then(() => {
            res.status(201);
            res.json({ "message": "success" });
            res.end();
          });
        } else {
          res.status(404);
          res.json({ "message": "cannot found" });
          res.end();
        }
      });
    }
  },
  delete: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401);
      res.json({ 'message': 'need user session' });
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;
      let id = req.query.id;

      daily_schedules.findOne({ where: { id: id, user_id: userId } }).then(data => {
        if (data) {
          daily_schedules.destroy({ where: { user_id: userId, id: id } }).then(() => {
            res.status(200);
            res.json({ "message": "success" });
            res.end();
          }).catch(err => {
            res.status(501);
          })
        } else {
          res.status(404);
          res.json({ "message": "cannot found" });
          res.end();
        }
      })


    }
  }
};
