// const { goals } = require('../../__test__/database/models');
const { goals } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  get: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401);
      res.json({ "message": "need user session" });
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;
      
      let category = req.query.category;
      let year = req.query.year;
      let day;
      req.query.day ? day = req.query.day : day = null;

      // let [category, year, day] = req.params;

      //console.log(category, year, day);
      //console.log(userId);
      goals.findAll({
        where: {
          user_id: userId,
          category: category,
          year: year,
          day: day
        }
      }).then(data => {
        // console.dir(data);
        // console.log('===========================================');
        // console.dir(data.dataValues);
        res.status(200);
        res.json(data);
        res.end();
      }).catch(err => {
        res.status(404);
        res.json({ "message": "not found" });
        res.end();
      })
    }

  },
  post: (req, res) => {
    let token = req.cookies.token;
    let userId = jwt.verify(token, process.env.JWT_SECRET).id;
    let category = req.body.category;
    let name = req.body.name;
    let year = req.body.year;
    let day;
    req.body.day ? day = req.body.day : day = null;
    let is_done = false;

    goals.create({
      category: category,
      name: name,
      year: year,
      day: day,
      is_done: is_done,
      user_id: userId
    }).then(data => {
      res.status(201);
      // res.json(data);
      res.json({ "message": "success" });
      res.end();
    }).catch(err => {
      res.status(502);
      //console.err(err);
      res.send(err);
      res.end();
    })
    //제대로 생성된 경우에만 응답하도록 변경 필요

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
      let category = req.body.category;
      let name = req.body.name;
      let year = req.body.year;
      let day;
      req.body.day ? day = req.body.day : day = null;
      let is_done = req.body.is_done;

      goals.findOne({ where: { id: id, user_id: userId } }).then(data => {
        if(data){
          goals.update({
            category: category,
            name: name,
            year: year,
            day: day,
            is_done: is_done,
          }, { where: { id: id } }).then(() => {
            res.status(201);
            res.json({ "message": "success" });
            res.end();
          })
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

      goals.findOne({ where: { id: userId, id: id } }).then(data => {
        if(data){
          // console.log(data);
          goals.destroy({ where: { id: userId, id: id } }).then(() => {
            res.status(200);
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
  }
};
