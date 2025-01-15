# Projet de fin de module NoSQL

Pour ce projet, vous allez créer une petite API qui va servir de backend à une plateforme d'apprentissage en ligne. J'ai préparé la structure du projet avec une organisation professionnelle du code, comme vous pouvez le constater dans ce dépôt Github.


# Les questions avec réponses :
1. Pourquoi créer un module séparé pour les connexions aux bases de données ?

Réponse : Il est important de disposer d'un module dédié à la gestion des connexions aux bases de données afin d'éviter la répétition du même code à travers l'application et de garantir que cette logique soit centralisée et réutilisable. Cela simplifie également la maintenance et facilite l'évolution du projet.

2. Comment gérer proprement la fermeture des connexions ?

Réponse : Pour bien fermer les connexions, il est nécessaire de définir une fonction spécifique qui sera exécutée lorsque l'application se termine ou rencontre une erreur. Par exemple, on utilise mongoClient.close() pour MongoDB et redisClient.quit() pour Redis afin de libérer les ressources correctement.

3. Pourquoi est-il important de valider les variables d'environnement au démarrage ?

Réponse : La validation des variables d'environnement dès le démarrage de l'application est important pour garantir que toutes les configurations nécessaires sont présentes et correctes avant d'exécuter l'application. Cela permet de gérer efficacement les erreurs et renforce la stabilité de l'application.

4. Que se passe-t-il si une variable requise est manquante ?

Réponse : Lorsqu'une variable requise est absente, cela peut entraîner des erreurs, telles que des échecs de connexion à la base de données, des interruptions de l'API, voire des plantages de l'application.

5. Quelle est la différence entre un contrôleur et une route ?

Réponse : Une route définit l'URL et la méthode HTTP à utiliser pour une requête, en orientant celle-ci vers un contrôleur approprié. Le contrôleur, quant à lui, contient la logique pour traiter la requête, interagir avec les données et retourner une réponse.

6. Pourquoi séparer la logique métier des routes ?

Réponse : Séparer la logique métier des routes permet de mieux organiser le code et de respecter le principe de séparation des responsabilités. Cela rend le code plus clair, facilite la réutilisation de la logique métier dans différents contrôleurs et services, et réduit la duplication du code.

7. Pourquoi séparer les routes dans différents fichiers ?

Réponse : Diviser les routes en plusieurs fichiers aide à mieux organiser l'application. Cela empêche un fichier unique de devenir trop volumineux et difficile à maintenir. De plus, cela permet d'ajouter de nouvelles fonctionnalités sans perturber l'organisation des autres parties du projet.

8. Comment organiser les routes de manière cohérente ?

Réponse : Pour organiser les routes de manière structurée, il est essentiel de séparer les routes en fonction des entités, d'utiliser des préfixes pour regrouper les routes par fonctionnalité, et de centraliser les routes dans un fichier principal pour en faciliter la gestion.


9. Pourquoi créer des services séparés ?

Réponse : Les services séparés permettent d'isoler la logique métier et de gérer de manière autonome les interactions avec des composants externes, comme les bases de données ou les caches, tout en rendant le code plus modulaire et réutilisable.

10. Comment gérer efficacement le cache avec Redis ?

Réponse : Pour gérer le cache avec Redis de façon efficsace, il est important de définir des expirations pour les clés (TTL), d'utiliser des stratégies d'éviction (comme LRU) pour gérer la mémoire, et de garantir que chaque élément a une clé unique, ce qui facilite sa gestion.

11. Quelles sont les bonnes pratiques pour les clés Redis ?

Réponse : Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms descriptifs, l'ajout de préfixes pour éviter les conflits de noms, et la création de clés courtes. Il est aussi recommandé de définir une expiration pour les données mises en cache, sauf si elles sont destinées à être permanentes.

12. Comment organiser le point d'entrée de l'application ?

Réponse : Le point d'entrée de l'application doit être bien structuré pour initialiser les connexions, configurer les middlewares, définir les routes, et démarrer le serveur. La configuration complexe doit être déplacée dans des fichiers séparés. L'application doit démarrer de manière asynchrone pour attendre l'établissement des connexions avant de traiter les requêtes.

13. Quelle est la meilleure façon de gérer le démarrage de l'application ?

Réponse : La gestion du démarrage de l'application peut être optimisée en suivant ces bonnes pratiques : assurez-vous que toutes les connexions aux bases de données et services externes (comme Redis) sont établies avant de démarrer le serveur, en utilisant async/await pour attendre leur réussite. Le démarrage du serveur doit être asynchrone, permettant de lancer les connexions avant de commencer à accepter les requêtes. Enfin, il est crucial de gérer les erreurs de démarrage en empêchant le serveur de démarrer si une connexion échoue, avec un message d'erreur explicite.

14. Quelles sont les informations sensibles à ne jamais commiter ?

Réponse :Il est impératif de ne jamais commettre d'informations sensibles telles que des identifiants de bases de données, des clés d'API, des jetons d'authentification, ou des données personnelles (comme des mots de passe et des informations privées) dans le code source. 

15. Pourquoi utiliser des variables d'environnement ?

Réponse : Les variables d'environnement permettent de séparer les informations sensibles du code source. Elles facilitent la configuration du projet selon l'environnement (développement, test, production) et simplifient la maintenance, car elles peuvent être ajustées sans toucher au code, tout en offrant une meilleure sécurité et une plus grande flexibilité.

# FIN DES REPONSES DES QUESTIONS 

# CONFIGURATION ET EXECUTION DU PROJET EN LOCAL

1. Cloner le dépôt

git clone https://github.com/SARA-amrani/learning-platform-nosql
cd learning-platform-template

2. Installer les dépendances

npm install

3. Démarrer les services nécessaires

Base de données MongoDB : mongod
Serveur Redis : redis-server

Structure du projet
Le projet est organisé de manière modulaire pour faciliter la lisibilité, la maintenance et l'évolutivité. Voici une vue d'ensemble de la structure :

src/config :

db.js : Contient la logique pour se connecter à la base MongoDB et Redis.

env.js : Gère le chargement des variables d'environnement à partir du fichier .env.

src/controllers :

courseController.js : Gère la logique métier pour les cours, comme la création,la modification et la suppression.

src/routes :

courseRoutes.js : Définit les endpoints pour interagir avec les cours.

src/services :

mongoService.js : Fournit des fonctions pour interagir avec MongoDB.

redisService.js : Fournit des fonctions pour utiliser Redis comme système de cache.

src/app.js : Point d'entrée principal qui initialise le serveur, configure les middlewares et monte les routes.

.env : Contient les informations sensibles (URI de la base de données, clés API, etc.) qui ne doivent pas être exposées dans le code source.

package.json : Décrit les dépendances nécessaires au projet et fournit des scripts pour le développement et le déploiement.

Choix et Utilisation de Postman pour Tester l'API
Le choix technique que j'ai effectué pour tester et interagir avec l'API est Postman. Cet outil est particulièrement adapté pour l'automatisation des tests d'API grâce à son interface graphique intuitive et à ses nombreuses fonctionnalités avancées. Il permet de simuler facilement des requêtes HTTP, d'inspecter les réponses et de vérifier la conformité des données retournées par l'API.

