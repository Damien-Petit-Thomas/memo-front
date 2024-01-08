# Memo_svelte


code source de mon application de prise de note






## Dockerfile 

```
# Dev Stage
FROM node:lts-slim as dev

WORKDIR /app
COPY . .

RUN npm install

# creation d'un volume pour visualiser de suite les modifications
VOLUME /app


# on force le mode production pour bénéficié d'une résolution dns des autres containers
# applicatifs sur le même # reseau
CMD ["npm", "run", "dev", "--", "--host", "--mode", "production"]


# Build Stage
FROM node:lts-slim as build

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build


# Prod Stage
FROM node:lts-slim as prod

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/my-server.js ./my-server.js


RUN npm install --omit=dev
USER node

EXPOSE 8088

CMD ["npm", "run", "start"]

```

pour fonctionner l'application necessite

 - un container sveltkit (architecture backend hybride puisque j'utilise également un container node pour le back)
 - un container de BDD
 - un container backend
 - un container apache : reverse proxy offloading

















![Automated Upload](https://github.com/Damien-Petit-Thomas/memo-front/actions/workflows/container.yml/badge.svg)