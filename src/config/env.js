// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : 
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : 

require('dotenv').config();
const uri = process.env.MONGODB_URI;

console.log(uri);


const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  requiredEnvVars.forEach((v) => {
    if (!process.env[v]) {
      throw new Error(`${v} env variable is required`);
    } else {
      console.log(`${v}: ${process.env[v]}`); // Vérification de la variable
    }
  });
}

// Appeler la fonction de validation dès le démarrage
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};