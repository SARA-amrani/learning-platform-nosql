// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');
const { connectDB } = require('./config/db');


const courseRoutes = require('./routes/courseRoutes');
//const studentRoutes = require('./routes/studentRoutes');
const app = express();





app.use(express.json());
app.use('/api/courses', courseRoutes);


async function startServer() {
  try {
    // Initialisation les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    // Configuration les middlewares Express
    app.use(express.json());

    
    // Démarrage de serveur
    const port = config.port || 3000;
    app.listen(port, () => {
      console.log(`Start server with port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // Implémentation de la fermeture propre des connexions
  try {
    console.log('Stopping server...');

    await db.closeConnections();

    process.exit(0);
  } catch (error) {
    console.error('Error stopping the server:', error);
    process.exit(1);
  }
});

startServer();
module.exports = app;