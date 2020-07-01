const { user } = require('../../modules');
const { calender } = require('../../models');
const { interm_check } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  put: (req, res) => {
    let { category, name, is_repeat, start,  end, is_done } = req.body;    //Query Params
    let interm = req.body.interm;  //interm_check arr
    let id = req.params.id;   //Path Params, calendar id
    let token = req.cookies.token; //cookie

    if(!token){  //토큰이 없는 경우
       res.status(401);
       res.json({'message': 'need user session'});
       res.end();
    } else {
       let decoded = jwt.verify(token, process.env.SECRET_KEY) //export SECRET_KEY='urSecretKey'
       //변경 필요, 어떻게 값이 넘어오는지 중요
       let userId = decoded.userid;
       calender.findOne({where: {id: id}}). then(data => {
         if(data.user_id !== userId){   //본인의 권한이 맞는지 확인
            res.status(401);
            res.json({'message': 'need user session'});
            res.end();
         }
       });
       calender.update({category: category, 
         name: name, 
         start: start,
         end: end,
         is_repeat: is_repeat,
         is_done: is_done},{ where: {id: id}})
       interm_check.update({alarm_time: interm},{where: {calendar_id: id}});
       
       calender.findOne({where: {id: id}}).then(data => {
           res.status(200);
           res.json(data);
           res.end();
       })
    }
  }
};
