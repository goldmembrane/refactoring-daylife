// const { users } =  require('../../__test__/database/models');
const { users } =  require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  post: (req,res) => {
    const { email,password } = req.body;

    users
    .findOne({ where:{ email:email }})
    .then(user => {
      if(user){
        if(user.dataValues.password === password){ 
          let payload = { id: user.id };
          let secret = process.env.JWT_SECRET;
          jwt.sign(payload, secret, { expiresIn:'50m' },(err,token) =>{
            if(err){
              res.status(500).send(err);
            } else {
              res.cookie('token',token);
              res.json({ id:user.dataValues.id }); //12번쨰 줄과 이 부분이 이렇게 해서 데이터에 잘 접근할 수 있는지가 헷갈립니다.
            } 
          })
        } 
      } else { 
        res.status(404).json({ message:'unvalid user'});
      }
    })
    .catch(err => {
      res.status(500).send(err);
    })
    
    /* 처음엔 아래처럼 작성했었는데 api docs와 맞추어보니 조금 어색해서 위처럼 수정했어요. P/R 전 상의로 결정하면 좋겠습니다!
    let secret = process.env.JWT_SECRET;

    getToken = () => {
      let token = jwt.sign({email:email}, secret,{ expiresIn:'5m' })
      return token;
    }

    users
    .findOne({ where:{ email:email }})
    .then(user => {
      if(user && user.password === password){
        token =  user.getToken();
        res.json({ id:user.dataValues.id, username:user.dataValues.username});
        //43번째 줄 없이 res.json({ token: user.getToken()})로 작성했었는데  api docs에 맞게 수정했습니다.
      } else {
        throw err
      }
    })
    .catch(err => {
      res.send(err)
    })
    */
  }
}

