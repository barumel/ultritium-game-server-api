FROM node:12.16.2-alpine

RUN mkdir -p /srv/api

WORKDIR /srv/api

COPY package*.json ./

COPY index.js ./

COPY src ./src

RUN npm install

EXPOSE 8080
CMD [ "node", "index.js" ]
