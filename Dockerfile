# Étape 1: Utiliser une image Node.js officielle comme base
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier les fichiers et dossiers du projet dans le répertoire de travail du conteneur
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Commande pour exécuter l'application
CMD ["node", "app.js"]
