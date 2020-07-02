const { users } =  require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  get: (req,res) => {
    let token = req.cookie.token;
    let secret = process.env.JWT_SECRET;
    
    let decoded = jwt.verify(token, secret);
    if(decoded){
      users
      .findOne({where: {email:decoded.email}})
      .then(user => {
        if(user === null){
          res.status(204).send('No Content');
        } else {
        res.status(200).send({username:user.dataValues.username, email:user.dataValues.email});
        }
      })
    } else {
      res.status(401).send('Unauthorized');
    }
  }
}