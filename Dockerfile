
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
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
RUN npm install --production

EXPOSE 8088

CMD ["npm", "run", "start"]