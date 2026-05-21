# Sync Music App

Sync Music App est une application web permettant à deux utilisateurs d’écouter la même musique à distance de manière synchronisée.

Le projet repose sur un système de rooms : un utilisateur peut créer une room, inviter un ami, puis synchroniser la lecture d’une musique avec lui en temps réel.

L’objectif est de construire une expérience proche d’une session d’écoute partagée, en synchronisant les actions principales : lecture, pause, changement de musique et position dans le morceau.

## Objectifs du projet

- Créer une room d’écoute partagée
- Permettre à un ami de rejoindre la room
- Synchroniser les actions de lecture en temps réel
- Intégrer un lecteur YouTube via l’IFrame API
- Synchroniser play, pause, seek et changement de vidéo
- Construire une application propre avec une architecture frontend / backend

## Stack technique

### Frontend

- React
- TypeScript
- Vite
- Socket.IO Client
- YouTube IFrame API

### Backend

- Node.js
- Express
- Socket.IO
- CORS

### Outils

- Git / GitHub
- npm
- nodemon

## Structure du projet

```txt
sync-music-app/
├── client/   # Frontend React
├── server/   # Backend Node.js / Express / Socket.IO
└── README.md

# Sync Music App

Sync Music App est une application web permettant à deux utilisateurs d’écouter la même musique à distance de manière synchronisée.

Le projet repose sur un système de rooms : un utilisateur peut créer une room, inviter un ami, puis synchroniser la lecture d’une musique avec lui en temps réel.

L’objectif est de construire une expérience proche d’une session d’écoute partagée, en synchronisant les actions principales : lecture, pause, changement de musique et position dans le morceau.

## Objectifs du projet

- Créer une room d’écoute partagée
- Permettre à un ami de rejoindre la room
- Synchroniser les actions de lecture en temps réel
- Intégrer un lecteur YouTube via l’IFrame API
- Synchroniser play, pause, seek et changement de vidéo
- Construire une application propre avec une architecture frontend / backend

## Stack technique

### Frontend

- React
- TypeScript
- Vite
- Socket.IO Client
- YouTube IFrame API

### Backend

- Node.js
- Express
- Socket.IO
- CORS

### Outils

- Git / GitHub
- npm
- nodemon

## Structure du projet

```txt
sync-music-app/
├── client/   # Frontend React
├── server/   # Backend Node.js / Express / Socket.IO
└── README.md
```

## Installation

Cloner le projet :

```bash
git clone <url-du-repo>
cd sync-music-app
```

Installer les dépendances du frontend :

```bash
cd client
npm install
```

Installer les dépendances du backend :

```bash
cd ../server
npm install
```

## Lancement du projet

Le projet contient deux parties :

- `client/` : le frontend React
- `server/` : le backend Node.js / Express / Socket.IO

Il faut lancer les deux dans deux terminaux différents.

### 1. Lancer le backend

Dans un premier terminal, depuis la racine du projet :

```bash
cd server
npm run dev
```

Le backend tourne ensuite sur :

```txt
http://localhost:3000
```

### 2. Lancer le frontend

Dans un deuxième terminal, depuis la racine du projet :

```bash
cd client
npm run dev
```

Le frontend tourne ensuite sur :

```txt
http://localhost:5173
```

### 3. Ouvrir l’application

Ouvrir dans le navigateur :

```txt
http://localhost:5173
```

Le backend doit rester lancé en même temps pour que la synchronisation temps réel fonctionne.

## Fonctionnement prévu

1. Un utilisateur crée une room.
2. Un second utilisateur rejoint cette room.
3. Le host choisit une vidéo YouTube.
4. Les deux clients chargent la même vidéo.
5. Les actions du host sont envoyées au serveur via Socket.IO.
6. Le serveur diffuse les actions aux autres utilisateurs de la room.
7. Les lecteurs YouTube restent synchronisés.

## Événements temps réel prévus

- `join-room`
- `leave-room`
- `play`
- `pause`
- `seek`
- `change-video`
- `sync-state`

