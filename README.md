# Projet MEAN 

Le projet ci-après est un projet en guise d'apprentissage du langage [NodeJS](https://nodejs.org/en/about/) pour le parcours MBDS.
Les [cours](http://miageprojet2.unice.fr/Intranet_de_Michel_Buffa/MBDS_Madagascar_2021-2022_Angular_-_NodeJS_-_MongoDB_-_Cloud) sur les technologies MEAN (MongoDB, Express, Angular, Node Js) de [Michel Buffa](https://www.linkedin.com/in/michelbuffa/) ont aidé à la réalisation du projet. 
Cette partie concerne les web services a été déployée sur [Heroku](https://mbds-madagascar-2022-api.herokuapp.com/) , un service cloud pour pouvoir tester en temps réel l'application.
## Pour commencer

Afin de lancer ce projet dans votre environnement local, vous devriez avoir les environnement requis

### Pré-requis
Avant de commencer, installez les logiciels suivants

- [NodeJS](https://nodejs.org/en/download/) v14.0.0 (ou ultérieure)
- [MongoDB Serveur](https://www.mongodb.com/try/download/community) v5.0.6 (ou ultérieure)
- [Visual Studio Code](https://code.visualstudio.com/download)

### Installation

 - Pour les tests locals, clonez le projet [backend](https://gitlab.com/m10221/backend) 
Ensuite, basculez-vous dans la branche env/local en lançant la commande  ``git checkout env/local`` ou utilisez des  outils comme SourceTree (ou Smart Git, ....)
 - Pour la base de données, dans un terminal, lancez la commande ``mongo`` pour vérifier si vous avez installé un MongoDB Serveur. Puis créez une base donnée appelé *assignments*  en lancant la commande ``use assignments``. Créez également les collections *matieres, users, assignements* dans cette base. Importer les json user.json, assignment.json, matiere.json
 
## Démarrage
 - Ouvrez le projet dans l'éditer de texte VS Code 
 - Vérifiez le fichier server.js que la variable  *uri* correspond bien à votre environnement local. On devrait avoir `const uri = 'mongodb://127.0.0.1/assignments?retryWrites=true&w=majority';` sauf si vous avez changer.
 - Dans le terminal de VS Code, lancez la commande  ``npm install`` afin installer les modules nécessaire 
 - Puis lancez la commande  ``npm start``

## Developpé avec
* [NodeJS](http://materializecss.com) - Framework JS (backend)
* [Express](https://expressjs.com/fr/) - Utilitaires HTTP
* [VS Code](https://atom.io/) - Editeur de textes
* [MongoDB](https://www.mongodb.com/) - Base de donnée NoSQL


## Versions
**Dernière version stable :** 1.0.0
**Dernière version :** 1.0.0

## Auteurs

- ANDRIANARISAONA Misaina Tsiory Tafita (numéro 2) [@TsioryTafita](https://gitlab.com/TsioryTafita)
- MIANDRISOA ASIMBOLA Sitraky Ny Avo (numéro 8) [@Sitraka Asimbola](https://gitlab.com/asimbola.sitraka)
