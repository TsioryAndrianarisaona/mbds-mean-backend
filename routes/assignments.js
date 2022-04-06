let Assignment = require('../model/assignment');
const matiere = require('../model/matiere');
let Matiere = require('../model/matiere');
// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    let user = req.user;
    if(user.sub.isAdmin){
        Assignment.find((err, assignments) => {
            if(err){
                return res.send(err)
            }
    
            return res.send(assignments);
        });
    }
    else{ 
        Assignment.find({auteur : user.name}, (err, assignment) =>{
            if(err){res.send(err)}
            res.json({assignements: assignment, user: user});
        })
    }
   
}
// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;
   
    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Recuperer par matieres
function assignementsByMatiere(req,res){
    let matiere = req.params.matiere;
    Assignment.find({matiere : matiere}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json({assignements: assignment, user: user});
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.auteur = req.body.auteur;
    assignment.note = req.body.note;
    assignment.rendu = !assignment.note? false : req.body.rendu;
    assignment.remarques= req.body.remarques;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
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
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    if(!req.user.sub.isAdmin){
        return res.send("Not enough permission");
     }
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}




module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment,assignementsByMatiere};
