import { findOne } from '../model/User';
import { hashPassword } from '../utils';
import { generateAccessToken } from './auth';
const login = (req, res) => {
  if(!req.body.username){ res.status(400).send("Please provide emailOrUserName attribute."); return; }
  if(!req.body.password){ res.status(400).send("Please provide password attribute."); return; }
  findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if(err)
        throw new Error(err);
      if(!user){
        res.status(404).json({message: 'User not found'})
        return;
      }
      if(hashPassword(req.body.password) === user.password){
        user.password = undefined;
        res.status(200).json({user, accessToken: generateAccessToken(user)});
      }
      else{
        res.status(403).json({message: 'Wrong password'});
      }
    }
  );
}

function getUser(req, res){
  if(!req.params.id) {
    res.status(400).json({message: 'Missing id parameter'});
  }
  let userId = req.params.id;
  findOne({_id: userId}, (err, subject) =>{
    if(err){res.send(err)}
    res.json(subject);
  })
}

export default {
  login, getUser
}
