let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    _id: Schema.Types.ObjectId,
    id: Number,
    dateRendu: String,
    nom: String,
    rendu: Boolean,
    grade: Number,
    subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
    comment: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
AssignmentSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
