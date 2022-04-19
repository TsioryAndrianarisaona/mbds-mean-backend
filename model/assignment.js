let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    auteur: String,
    matiere: String,
    note: Number,
    remarques: String,
    etat: Number
});
/**
 * Liste des états :
 * -20 --supprimé
 * -10 --demande de suppression
 * 0    --crée
 * 10   -- délivré
 * 20   -- noté
 */
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
