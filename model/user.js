const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    _id: ObjectID,
    username: String,
    email: String,
    password: String,
    type: String,
    preview: String
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('User', UserSchema);
