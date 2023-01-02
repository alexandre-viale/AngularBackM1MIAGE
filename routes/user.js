const User = require('../model/User');
const { hashPassword } = require('../utils');
const auth = require('./auth');
const login = (req, res) => {
  if(!req.body.username){ res.status(400).send("Please provide emailOrUserName attribute."); return; }
  if(!req.body.password){ res.status(400).send("Please provide password attribute."); return; }
  User.findOne(
    {
      "$or":
      [
        { userName :  req.body.emailOrUsername },
        { email  :  req.body.emailOrUsername }
      ]
    },
    (err, user) => {
      if(err)
        throw new Error(err);
      if(!user){
        res.status(404).send("This email or username doesn't exists.");
        return;
      }
      if(hashPassword(req.body.password) === user.password){
        user.password = undefined;
        res.status(200).send({user, accessToken: auth.generateAccessToken(user)});
      }
      else{
        res.status(401).send("Incorrect password.");
      }
    }
  );
}

// Récupérer un user par son id (GET)
function getUser(req, res){
  let userId = req.params.id;
  console.log(req.params.id);
  User.findOne({_id: userId}, (err, subject) =>{
    if(err){res.send(err)}
    res.json(subject);
  })
}

module.exports = {
  login, getUser
}
