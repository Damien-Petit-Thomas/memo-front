# Memo_svelte


code source de mon application de prise de note

il en existe plein d'autres... mais ça me tentais de me lancer à mon tour !

fonctionalités de base :
 > prise en charge syntaxe markdown
 > création automatisée d'une barre laterale de navigation
> creation de catégorie 
> creation de tag


 fonctionalités en plus! :
 > tout lien  internet dans une note est automatiquement détecté et apparaitront de maniere ordonné dans l'onglet lien utiles
 > possibilité d'ajouts de mots dans un lexique   chaque occurence d'un mot appartenat au lexique est automatiquement détectée et un affichage spécifique est appliqué
 > presence d'une mini todo liste
 > aide à mise en page avec des composants automatiquement crées et déplaçable / suprimable d'un click
 

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
 - un container de BDD : postgresql
 - un container backend : Node.js
 - un container server : apche : reverse proxy offloading


pour utiliser l'application : aller au répo [memo_db_compose](https://github.com/Damien-Petit-Thomas/memo_db_compose) qui contient les dockerfiles pour le container de la bdd , du serveur apache et donc le fichier docker-compose





![Automated Upload](https://github.com/Damien-Petit-Thomas/memo-front/actions/workflows/container.yml/badge.svg)