let express = require('express');
let app = express();
let cors = require('cors')
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let subject = require('./routes/subjects');
let user = require('./routes/user');
let auth = require('./routes/auth');
require('dotenv').config();
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);
app.use(cors())
// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = process.env.MONGODB;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(auth.authenticateToken, assignment.getAssignments)
  .post(auth.authenticateToken, assignment.postAssignment)
  .put(auth.authenticateToken, assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(auth.authenticateToken, assignment.getAssignment)
  .delete(auth.authenticateToken, assignment.deleteAssignment);
  
app.route(prefix + '/subjects')
  .get(auth.authenticateToken, subject.getSubjects)
  .post(auth.authenticateToken, subject.postSubject)
  .put(auth.authenticateToken, subject.updateSubject);

app.route(prefix + '/subjects/:id')
  .get(auth.authenticateToken, subject.getSubject)
  .delete(auth.authenticateToken, subject.deleteSubject);

app.route(prefix + '/user/login')
  .post(user.login);
// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


