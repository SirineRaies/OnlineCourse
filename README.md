## 🧑‍💻 OnlineCourse Backend

Ce projet est un backend Node.js / Express pour la plateforme OnlineCourse, qui gère les cours en ligne, les utilisateurs et les inscriptions.
Il a été conçu avec une approche moderne intégrant tests automatisés, linting, conteneurisation Docker, et un déploiement continu (CD) via GitHub Actions et Render.

## 🚀 Fonctionnalités principales

- API REST construite avec Express.js
- Base de données hébergée sur MongoDB Atlas
- Tests unitaires et d’intégration avec Jest et Supertest
- Vérification de la qualité du code avec ESLint
- Conteneurisation avec Docker et Docker Compose
- Pipeline CI/CD automatisée avec GitHub Actions
- Déploiement sur Render

## 🧩 Stack Technique

- Node.js: Environnement d’exécution
- Express.js:	Framework backend
- MongoDB Atlas:	Base de données NoSQL cloud
- Jest + Supertest: Tests unitaires et d’intégration
- ESLint:	Analyse de la qualité du code
- Docker:	Conteneurisation du projet
- GitHub Actions:	Intégration et déploiement continu
-Render:	Hébergement et déploiement du backend

## ⚙️ Installation locale

- 1️⃣ Cloner le dépôt
  <pre> git clone https://github.com/SirineRaies/OnlineCourse.git
   cd OnlineCourse </pre>

- 2️⃣ Installer les dépendances
  <pre>npm install</pre>

- 3️⃣ Lancer le serveur
  <pre>npm start</pre>


Le serveur démarre sur http://localhost:5000

## 🧪 Tests
- Lancer les tests Jest :
 <pre>npm test</pre>


Les tests vérifient :

- La connexion MongoDB
- Le fonctionnement des routes principales
- Les statuts HTTP attendus

## 🧹 Lint du code
- Exécuter ESLint :
 <pre>npm run lint</pre>

## 🐳 Docker
- Construire et exécuter le conteneur
 <pre>docker-compose up --build </pre>

Cela :

- Crée l’image onlinecourse-backend
- Lance le service avec les variables d’environnement définies dans .env

## ⚙️ Intégration Continue (CI)

Le workflow GitHub Actions effectue automatiquement aprés chaque commit dans la branch principale main :

- Installation des dépendances
- Vérification ESLint
- Exécution des tests Jest
- Build Docker

## 🚀 Déploiement Continu (CD)

Une fois les tests passés, le pipeline déclenche automatiquement le déploiement sur Render à l’aide d’un Deploy Hook stocké dans les GitHub Secrets.
Il est déployé sur : https://onlinecourse-backend.onrender.com/api/courses

## 🧠 Auteur
Sirine Raies: Étudiante en génie informatique à l’École Polytechnique de Sousse.<br>
Ce projet a été conçu afin de mettre en pratique les concepts fondamentaux du DevOps, notamment l’intégration continue (CI), le déploiement continu (CD) et la containerisation avec Docker.
