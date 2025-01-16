// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');


const db = require('../config/db');

require('dotenv').config();

const { getDb } = require('../config/db');

function getCollection(collectionName) {
  const db = getDb();
  if (!db) {
    throw new Error('La connexion à MongoDB n est pas initialisée.');
  }
  return db.collection(collectionName);
}

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    const objectId = new ObjectId(id);
    const result = await db.collection(collection).findOne({ _id: objectId });
    return result;
  } catch (error) {
    throw new Error(`!!!!Erreur lors de la recherche dans la collection ${collection}: ${error.message}`);
  }
}

async function findOneByField(collectionName, query) {
  try {
    const collection = getCollection(collectionName);
    return await collection.findOne(query);
  } catch (error) {
    console.error(`!!!!Erreur lors de la recherche dans ${collectionName} :`, error);
    throw error;
  }
}

async function createCourse(course) {
  try {
    const collection = getCollection('courses');
    const result = await collection.insertOne(course);

    const createdCourse = { ...course, _id: result.insertedId };
    return createdCourse;
  } catch (error) {
    console.error('!!!!Erreur: la creation du cour pas reussie: ', error);
    throw error;
  }
}

async function findAll(collectionName) {
  try {
    const db = getDb(); 
    const collection = db.collection(collectionName);
    const result = await collection.find({}).toArray();
    return result;
  } catch (error) {
    console.error(`Erreur dans la recuperation de la collection ${collectionName}:`, error);
    throw new Error('Erreur dans la recuperation des donnees!!!!');
  }
}

async function deleteOneById(collectionName, id) {
  try {
    const objectId = new ObjectId(id);
    const collection = getCollection(collectionName);
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return null;
    }

    return true;
  } catch (error) {
    console.error(`Erreur : la suppression dans ${collectionName} pas reussie:`, error);
    throw new Error('Erreur dans la suppression des données!!!!!');
  }
}


// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  findOneByField,
  createCourse,
  findAll,
  deleteOneById,
};
