const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = Schema({
    _id: ObjectID,
    name: String,
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Subject', SubjectSchema);
