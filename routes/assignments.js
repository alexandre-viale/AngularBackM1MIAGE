const Assignment = require('../model/assignment');
const User = require('../model/user');
var ObjectID = require('mongodb').ObjectID;
// Récupérer tous les assignments (GET)
function getAssignments(req, res){
  filters = JSON.parse(req.query.filters);
  sort = JSON.parse(req.query.sort);
  pipeline = [];
  if(sort.field && sort.order) {
    pipeline.push({ $sort: { [sort.field]: sort.order } });
  }
  pipeline.push({
    $match: {
      $and: [
        filters.nom ? {nom: {$regex: filters.nom, $options: 'i'}} : {},
        {rendu: filters.rendu},
      ]
    }
  });
  const aggregateQuery = Assignment.aggregate(pipeline);
  Assignment.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
          if(err){
              res.send(err)
          }
          res.send(assignments);
      },
  );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;
    Assignment.findOne({_id: assignmentId}, (err, assignment) => {
      if(err)
        res.send(err)
      res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
  if(!req.body.nom) {
    res.status(400).json({message: 'Missing name parameter'});return;
  }
  if(!req.body.dateRendu) {
    res.status(400).json({message: 'Missing dateRendu parameter'});return;
  }
  if(!req.body.subject) {
    res.status(400).json({message: 'Missing subject parameter'});return;
  }
    let assignment = new Assignment();
    assignment._id = new ObjectID();
    assignment.nom = req.body.nom;
    assignment.dateRendu = req.body.dateRendu;
    assignment.rendu = req.body.rendu;
    assignment.grade = req.body.grade;
    assignment.subject = req.body.subject;
    assignment.comment = req.body.comment;
    assignment.owner = req.body.owner;
    console.log("POST assignment reçu :");
    assignment.save( (err) => {
      if(err){
          res.json(err);
      }
      res.json({"message":`${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  if(!req.body._id) {
    res.status(400).json({message: 'Missing id parameter'}); return ;
  }
  if(!req.body.nom) {
    res.status(400).json({message: 'Missing name parameter'});return;
  }
  if(!req.body.dateRendu) {
    res.status(400).json({message: 'Missing dateRendu parameter'});return;
  }
  if(!req.body.rendu) {
    res.status(400).json({message: 'Missing rendu parameter'});return;
  }
  if(!req.body.grade) {
    res.status(400).json({message: 'Missing grade parameter'});return;
  }
  if(!req.body.subject) {
    res.status(400).json({message: 'Missing subject parameter'});return;
  }
  if(!req.body.comment) {
    res.status(400).json({message: 'Missing comment parameter'}); return;
  }
  if(!req.body.owner) {
    res.status(400).json({message: 'Missing owner parameter'}); return;
  }

    console.log("UPDATE recu assignment : ");
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            res.send(err)
        } else {
            console.log(assignment);
          res.json({message: 'updated'})
        }
      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  if(!req.params.id) {
    res.status(400).json({message: 'Missing id parameter'}); return ;
  }
  if(res.locals.user.type !== 'admin') {
    res.status(403).json({message: 'Need to be admin to delete an assignment'}); return;
  }
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
      if (err) {
          res.send(err);
      }
        res.json({message: `Successfully deleted assignment ${assignment.nom}`})
      
  })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
