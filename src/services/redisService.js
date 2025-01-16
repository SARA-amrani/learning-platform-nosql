// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :


const { getRedisClient } = require("../config/db");
const redisClient = require('../config/db').redisClient;


// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    //Implémenter d'une fonction générique de cache
    const redisClient = getRedisClient();
  
  if (!redisClient) {
    console.error("Redis client non initialise.!!!");
    throw new Error("Redis client non initialise!!!.");
  }

  try {
    await redisClient.setEx(key, ttl, JSON.stringify(data));
    console.log(`Donnees mises en cache est reussie sous la cle ${key}`);
  } catch (error) {
    console.error("!!!Erreur lors du stockage dans le cache Redis:", error);
    throw new Error("Erreur de mise en cache dans Redis!!!");
  }
  }

  //fonction pour recuperer  les donnees du cache
async function getCacheData(key) {
  try {
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Erreur lors de la recuperation du cache Redis : ${error.message}`);
    throw new Error('Erreur de recuperation du cache Redis!!!');
  }
}
  
  module.exports = {
    cacheData,
    getCacheData,
  };