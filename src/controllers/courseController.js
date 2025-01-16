// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');
const { findAll } = require('../services/mongoService'); 

// Implémentation de la création d'un cours
async function createCourse(req, res) {
  try {
    const { title, description, instructorId } = req.body;

    if (!title || !description || !instructorId) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const existingCourse = await mongoService.findOneByField('courses', { title });
    if (existingCourse) {
      return res.status(409).json({ message: 'Un cours avec ce titre existe!!!.' });
    }

    const newCourse = await mongoService.createCourse({ title, description, instructorId });

    const cacheKey = `course:${newCourse._id}`;
    await redisService.cacheData(cacheKey, newCourse, 3600);

    return res.status(201).json(newCourse);
  } catch (error) {
    console.error('Erreur lors de la creation du cours:', error);
    return res.status(500).json({ message: 'Une erreur est predifinie.' });
  }
  
}

//fonction pour avoirun cours
async function getCourse(req, res) {
  try {
    const { id } = req.params;
    const course = await mongoService.findOneById(id);

    if (!course) {
      return res.status(404).json({ message: 'Cours non trouve.' });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error('Erreur lors de la recuperation du cours:', error);
    return res.status(500).json({ message: 'Une erreur est survenue.' });
  }
}

// avoir tous les cours
async function getAllCourses(req, res) {
  try {
    const courses = await findAll('courses');
    res.status(200).json(courses);
  } catch (error) {
    console.error('Erreur lors de la recuperation des cours:', error);
    res.status(500).json({ message: 'Erreur lors de la recuperation des cours!!!' });
  }
}

// modifier un cours
async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const { title, description, instructorId } = req.body;

    if (!title && !description && !instructorId) {
      return res.status(400).json({ message: 'Au moins un champ est requis pour la mise à jour.' });
    }

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (instructorId) updatedFields.instructorId = instructorId;

    const updatedCourse = await mongoService.updateOneById('courses', id, updatedFields);

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Cours non trouvé.' });
    }

    return res.status(200).json({ message: 'Cours mis à jour avec succès.', updatedCourse });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cours:', error);
    return res.status(500).json({ message: 'Une erreur est survenue.' });
  }
}


//pour supprimer un cours
async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    const deletedCourse = await mongoService.deleteOneById('courses', id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Cours non trouve.' });
    }

    return res.status(200).json({ message: 'Cours supprime avec succes.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du cours:', error);
    return res.status(500).json({ message: 'Une erreur est survenue.' });
  }
}




// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};