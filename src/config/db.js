// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env'); // ici import des variables d'environnement

let mongoClient, redisClient, db;

//Connexion à MongoDB
async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  try {
    mongoClient = new MongoClient(config.mongodb.uri);

    await mongoClient.connect(); // Connexion au serveur MongoDB
    db = mongoClient.db(config.mongodb.dbName); // Selection de la base de donnée
    console.log('Connexion MongoDB réussie');
} catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    process.exit(1); // Quitte l'application en cas d'échec 
}
  
}

//Connexion à Redis
async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  try {
    redisClient = redis.createClient({
        url: config.REDIS_URI, // URL de connexion Redis
    });

    redisClient.on('error', (err) => {
        console.error('Erreur Redis :', err);
    });

    await redisClient.connect(); // Connexion au serveur Redis
    console.log('Connexion Redis réussie');
} catch (error) {
    console.error('Erreur de connexion à Redis :', error);
    process.exit(1);
}
  
}

function getDb() {
  if (!db) {
    throw new Error("La base de données n'est pas encore initialisée.");
  }
  return db;
}

// Fermeture des connexions proprement à la fin du processus
async function closeConnections() {
  try {
      if (mongoClient) {
          await mongoClient.close();
          console.log('Connexion MongoDB fermée');
      }
      if (redisClient) {
          await redisClient.quit();
          console.log('Connexion Redis fermée');
      }
  } catch (error) {
      console.error('Erreur lors de la fermeture des connexions :', error);
  }
}

//les signaux de fermeture de l'application
process.on('SIGINT', async () => {
  console.log('\n Fermeture des connexions...');
  await closeConnections();
  process.exit(0);
});



// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  getDb,
  redisClient,
};