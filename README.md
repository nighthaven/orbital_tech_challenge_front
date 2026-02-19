# Case Technique Front — Développeur Full Stack - Boris Le Bon

Interface web React pour l'agent d'analyse de données.

## Prerequis

- [Docker](https://docs.docker.com/get-docker/) (recommande, pas besoin de Node)
- ou [Node.js 22+](https://nodejs.org/) pour un lancement en local

## Installation et lancement

### Option 1 — Avec Docker

```bash
docker build -t orbital-front .
docker run -p 5173:80 orbital-front
```

### Option 2 — En local (Node.js)

```bash
npm install
cp .env.example .env
npm run dev
```

Le frontend est accessible sur `http://localhost:5173`.

## Configuration

Le fichier `.env` contient une seule variable :

```
VITE_API_URL=http://localhost:8000/api
```

> `VITE_API_URL` est une variable de **compilation** — elle est integree dans le bundle au moment du build, pas a l'execution. Pour pointer vers un autre backend, modifie `.env` avant `npm run dev`, ou passe l'argument au build Docker :
>
> ```bash
> docker build --build-arg VITE_API_URL=http://mon-serveur:8000/api -t orbital-front .
> ```

## Commandes disponibles

```bash
npm run dev      # Serveur de developpement
npm run build    # Build de production
npm run preview  # Previsualiser le build de production
npm run lint     # Linter
```
