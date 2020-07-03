const { goals } = require('../../models');

module.exports = {
  get: (req, res) => {
    let token = req.cookies.token;
    if(!token){
      res.status(401);
      res.json({'message':'need user session'});
      res.end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET);
      
      // //param으로 가능하면 해보기
      // let category = req.params.category;
      // let year = req.params.year;

      let category = req.body.category;
      let year = req.body.year;
      let day;
      req.body.day ? day = req.body.day : day = null;

      goals.findAll({ where: {
        user_id: userId,
        category: category,
        year: year,
        day: day
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
      
      let category = req.body.category;
      let name = req.body.name;
      let year = req.body.year;
      let day;
      req.body.day ? day = req.body.day : day = null;
      let is_done = false;

      goals.create({
        category: category,
        name: name,
        year : year,
        day: day,
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
      let category = req.body.category;
      let name = req.body.name;
      let year = req.body.year;
      let day;
      req.body.day ? day = req.body.day : day = null;
      let is_done = req.body.is_done;

      goals.findOne({where: {id: id, user_id: userId}}).then(data => {
        if(!data) {
          res.status(404);
          res.json({"message":"cannot found"});
          res.end();
        }
      });

      goals.update({
        category: category,
        name: name,
        year : year,
        day: day,
        is_done: is_done,
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
      goals.destroy({where: {id: userId, id: req.body.id}}).then(() => {
        res.status(200);
        res.json({"message": "success"});
        res.end();
      })
      
    }
  }
};
