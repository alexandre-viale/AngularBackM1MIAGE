const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.body = Object.assign(req.body, user);
    next();
    },
  )
}
const generateAccessToken = (user) => {
  return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1y'});
} 
module.exports = {
  generateAccessToken,
  authenticateToken,
}