const Subject = require('../model/subject');
var ObjectID = require('mongodb').ObjectID;
// Récupérer tous les subjects (GET)
function getSubjects(req, res){
  Subject.find((err, subjects) => {
      if(err){
          res.send(err)
      }
      res.send(subjects);
  });
}

// Récupérer un subject par son id (GET)
function getSubject(req, res){
    if(!req.params.id) {
        res.status(400).json({message: 'Missing id parameter'}); return;
    }
    let subjectId = req.params.id;
    Subject.findOne({_id: subjectId}, (err, subject) =>{
      if(err){res.send(err)}
      res.json(subject);
    })
}

// Ajout d'un subject (POST)
function postSubject(req, res){
    if(!req.body.name) {
        res.status(400).json({message: 'Missing name parameter'});return;
    }
    if(!req.body.teacher) {
        res.status(400).json({message: 'Missing teacher parameter'}); return;
    }
    if(!req.body.preview) {
        res.status(400).json({message: 'Missing preview parameter'}); return;
    }
    if(res.locals.user.type !== 'admin') {
        res.status(403).json({message: 'Forbidden, need to be admin'}); return;
    }
    let subject = new Subject();
    subject._id = new ObjectID();
    subject.name = req.body.name;
    subject.teacher = req.body.teacher;
    subject.preview = req.body.preview;

    console.log("POST subject reçu :");

    subject.save( (err) => {
      console.log(err);
      if(err){
          res.json(err);
      }
      res.json({"message":`${subject.nom} saved!`})
    })
}

// Update d'un subject (PUT)
function updateSubject(req, res) {
    if(!req.params.id) {
        res.status(400).json({message: 'Missing id parameter'});return;
    }
    if(res.locals.user.type !== 'admin') {
        res.status(403).json({message: 'Forbidden, need to be admin'});return;
    }
    console.log("UPDATE recu subject : ");
    Subject.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, subject) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            console.log(subject);
          res.json({message: 'updated'})
        }
    });

}

// suppression d'un subject (DELETE)
function deleteSubject(req, res) {
    if(!req.params.id) {
        res.status(400).json({message: 'Missing id parameter'});return;
    }
    if(res.locals.user.type !== 'admin') {
        res.status(403).json({message: 'Forbidden, need to be admin'});return;
    }
    Subject.findByIdAndRemove(req.params.id, (err, subject) => {
      if (err) {
          res.send(err);
      }
      res.json({message: `${subject.nom} deleted`});
    })
}



module.exports = { getSubjects, postSubject, getSubject, updateSubject, deleteSubject };
