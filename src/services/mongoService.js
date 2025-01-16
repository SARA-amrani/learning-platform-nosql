// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');


const db = require('../config/db');

require('dotenv').config();

const { getDb } = require('../config/db');


function getCollection(collectionName) {
  const db = getDb();
  if (!db) {
    throw new Error('La connexion a MongoDB n est pas reussie.');
  }
  return db.collection(collectionName);
}

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  
  // une fonction générique de recherche par ID
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

  // une fonction générique pour crree un cour

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

async function updateOneById(collectionName, id, updatedFields) {
  try {
    const objectId = new ObjectId(id);
    const collection = getCollection(collectionName);
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: updatedFields }
    );

    if (result.matchedCount === 0) {
      return null;
    }

    return await findOneById(collectionName, id);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour dans ${collectionName}:`, error);
    throw new Error('Erreur lors de la mise à jour des donnees');
  }
}

// une fonction générique pour recuperer tous les documents 
// d'une collection MongoDB et les retourne sous forme de tableau

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

// une fonction générique pour supprimer un cour

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
  updateOneById,
  findAll,
  deleteOneById,
};
