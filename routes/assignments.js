let Assignment = require('../model/assignment');
let Matiere = require('../model/matiere');
var config = require('../config');
// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    let user = req.user;
    if(user.sub.isAdmin){
        Assignment.find({etat:{$ne: config.etatSupprime}},(err, assignments) => {
            if(err){
                return res.send(err)
            }
    
            return res.send(assignments);
        });
    }
    else{ 
        Assignment.find({auteur : user.sub.name, etat:{$ne: config.etatSupprime}}, (err, assignment) =>{
            if(err){res.send(err)}
            res.json({assignements: assignment, user: user});
        })
    }  
}


// Recuperation des etats selon etat
function getAssignmentByEtat(req, res){
    let user = req.user;
    let state=req.body.etat;
    if(state.length == 0){
        state = [config.etatcree, config.etatDelivre,config.etatNote,config.etatDemandeSupprime,config.etatSupprime]
    }
    if(user.sub.isAdmin){
        Assignment.find({etat:{$in: state}},(err, assignments) => {
            if(err){
                return res.send(err)
            }
    
            return res.send(assignments);
        });
    }
    else{ 
        Assignment.find({auteur : user.sub.name, etat:{$in: state}}, (err, assignment) =>{
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
    Assignment.find({matiere : matiere, etat:{$ne: config.etatSupprime}}, (err, assignment) =>{
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
    assignment.etat =  config.etatcree;
    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
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




module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment,assignementsByMatiere,getAssignmentByEtat};
