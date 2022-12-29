const sha = require('sha.js');

function hashPassword(pass){
  return sha('sha256').update(pass).digest('hex');
}

const userTypes = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

module.exports = {
  hashPassword,
  userTypes,
}