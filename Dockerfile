
FROM node:lts-slim as build

LABEL Developers="Damien Petit-Thomas"

WORKDIR /app
RUN rm -rf node_modules
RUN  rm -rf build
COPY . .

RUN npm install

RUN npm run build




FROM node:lts-slim as run

WORKDIR /app

RUN rm -rf ./*
COPY --from=build /app/package.json .
COPY --from=build /app/build .
RUN npm install --production

CMD ["node", "index.js"]