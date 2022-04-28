let Assignment = require("../model/assignment");
let Matiere = require("../model/matiere");
var config = require("../config");
// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
  let user = req.user;
  if (user.sub.isAdmin) {
    Assignment.find(
      { etat: { $ne: config.etatSupprime } },
      (err, assignments) => {
        if (err) {
          return res.send(err);
        }

        return res.send(assignments);
      }
    );
  } else {
    Assignment.find(
      { auteur: user.sub.name, etat: { $ne: config.etatSupprime } },
      (err, assignment) => {
        if (err) {
          res.send(err);
        }
        res.json({ assignements: assignment, user: user });
      }
    );
  }
}

// Recuperation avec pagination et critère
function getAssignmentByEtat(req, res) {
  let user = req.user;
  let state = req.body.etat;
  if (!user) {
    return res.send({
      data: {},
      message: "Session invalide",
      status: 401,
    });
  }
  if (state.length == 0) {
    state = [
      config.etatcree,
      config.etatDelivre,
      config.etatNote,
      config.etatDemandeSupprime,
      config.etatSupprime,
    ];
  }
  let where={
   
  }
  if(!user.sub.isAdmin){
    where["auteur"] = user.sub.name;
  }
  where["etat"] = {$in: state}
  if(req.body.matiere && req.body.matiere.length != 0){
      where["matiere"] = req.body.matiere;
  }
  let join ={
	from: "matieres",
	localField: "matiere",
	foreignField: "name",
	as: "matiereDetails"
	};
    let options = {
      page: parseInt(req.body.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    var aggregateQuery = Assignment.aggregate([{$match:where},{$lookup:join}]);
    Assignment.aggregatePaginate(
      aggregateQuery,
      options,
      (err, assignments) => {
        if (err) {
          return res.send({
            data: {},
            message: "Erreur lors pour les assignments",
            status: 400,
          });
        }
        return res.send({
          data: {
            assignments: assignments.docs,
            total: assignments.totalDocs,
            page: assignments.page,
            limit: assignments.limit,
          },
          message: "",
          status: 200,
        });
      }
    );
}
// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = req.params.id;
  Assignment.findOne({ _id: assignmentId }, (err, assignment) => {
    if (err) {
        return res.send({
            data: {},
            message: "Erreur lors de la recherche ",
            status: 400,
          });
    }
    if(assignment){
        Matiere.find({name : assignment.matiere},(err,matiere)=>{
            return res.send({
                data: {assignments:[assignment],matiere:[matiere]},
                message: "",
                status: 200,
              });
        })
    }
    else{
        return res.send({
            data: {assignments:[],matiere:[],prof:[]},
            message: "",
            status: 200,
          });
    }
   
  });
}


// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.nom = req.body.nom;
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.auteur = req.body.auteur;
  assignment.matiere = req.body.matiere;
  assignment.note = req.body.note;
  assignment.rendu = !assignment.note ? false : req.body.rendu;
  assignment.remarques = req.body.remarques;
  assignment.etat = config.etatcree;
  assignment.dateLimite=req.body.dateLimite;
  
  if(assignment.note && assignment.note < 0){
    return res.send({
        data: {},
        message: "Le note ne peut pas être négatif",
        status: 400,
      });
  }
  assignment.save((err) => {
    if (err) {
        return res.send({
            data: {},
            message: "Erreur lors de l'enregistrement",
            status: 400,
          });
    }
    return res.send({
        data: {},
        message: "Enregistrement effectué",
        status: 201,
      });
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    let user = req.user;
    if(req.body.note ){
        if(!user.sub.isAdmin){
            return res.send({
                data: {},
                message: "Authorisation requise",
                status: 400,
              }); 
        }
        if(req.body.note < 0){
            return res.send({
                data: {},
                message: "Les notes ne peuvent pas être négatif",
                status: 400,
              });
        }
        req.body.rendu = true;
        req.body.etat = 20;
		let date_ob = new Date();
		req.body.dateDeRendu = date_ob.getDay()+"/"+(date_ob.getMonth()+1)+"/"+date_ob.getYear();
    }
    
  Assignment.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: false },
    (err, assignment) => {
      if (err) {
        console.log(err);
        return res.send({
            data: {},
            message: "Erreur lors du mis à jour",
            status: 400,
          });
      } else {
        return res.send({
            data: {},
            message: "Enregistrement effectué",
            status: 201,
          });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  if (!req.user.sub.isAdmin) {
    return res.send("Not enough permission");
  }
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentByEtat
};
