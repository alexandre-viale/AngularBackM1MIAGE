let Assignment = require('../model/assignment');
var ObjectID = require('mongodb').ObjectID;
// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    var aggregateQuery = Assignment.aggregate();
    console.log(req.query);
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
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;
    console.log(req.params.id);
    Assignment.findOne({_id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment._id = new ObjectID();
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        console.log(err);
        if(err){
            res.json(err);
        }
        res.json({"message":`${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
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

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
