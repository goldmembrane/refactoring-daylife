const { user } = require('../../modules');
const { calender } = require('../../models');
const { interm_check } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  get: (req, res) => {
    let category = req.params.category;   //Path Params
    let token = req.cookies.token; //cookie

    if(!token){  //토큰이 없는 경우
       res.status(401);
       res.json({'message': 'need user session'});
       res.end();
    } else {
       let decoded = jwt.verify(token, process.env.SECRET_KEY) //export SECRET_KEY='urSecretKey'
       //변경 필요, 어떻게 값이 넘어오는지 중요
       let userId = decoded.userid;

       user.findAll({ where: {id: userId}})
       .then(data => {
          res.status(200);
          res.json(data);
          res.end();
       });
    }
  }
};
