// const { users } =  require('../../models');
const { users } =  require('../../__test__/database/models');

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  get: (req,res) => {
    let token = req.cookies.token;
    let secret = process.env.JWT_SECRET;
       
    if(token){
      let decoded = jwt.verify(token, secret);
      users
      .findOne({where: {id:decoded.id}})
      .then(user => {
        if(user === null){
          res.status(204);
          res.json({"message": "no content"});
        } else {
        res.status(200).send({id:user.dataValues.id, username:user.dataValues.username, email:user.dataValues.email});
        }
      })
    } else {
      res.status(401);
      res.json({"message": "need user session"});
    }
  }
}