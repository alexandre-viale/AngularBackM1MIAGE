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
    let subjectId = req.params.id;
    console.log(req.params.id);
    Subject.findOne({_id: subjectId}, (err, subject) =>{
      if(err){res.send(err)}
      res.json(subject);
    })
}

// Ajout d'un subject (POST)
function postSubject(req, res){
    let subject = new Subject();
    subject._id = new ObjectID();
    subject.name = req.body.name;
    subject.teacher = req.body.teacher;
    subject.preview = req.body.preview;

    console.log("POST subject reçu :");
    console.log(subject)

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
    console.log("UPDATE recu subject : ");
    console.log(req.body);
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

  Subject.findByIdAndRemove(req.params.id, (err, subject) => {
      if (err) {
          res.send(err);
      }
      res.json({message: `${subject.nom} deleted`});
  })
}



module.exports = { getSubjects, postSubject, getSubject, updateSubject, deleteSubject };
