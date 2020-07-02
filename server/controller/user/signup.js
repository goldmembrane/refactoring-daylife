const { users } =  require('../../models');

module.exports = {
  post: (req,res) => {
    const { username,email,password } = req.body;

    users
    .findOrCreate({
      where: {
        email: email
      },
      defaults: {
        username: username,
        password: password
      }
    })
    .then(async ([user,created]) => {
      if(!created){
        res.status(409).json({message: 'Already exists user'});
      }
      const data = await user.get({plain: true});
      res.status(200).json({message: 'success'});
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }
}