FROM node:12.16.2-alpine

RUN mkdir -p /srv/api

WORKDIR /srv/api

COPY package*.json ./

COPY index.js ./

COPY src ./src

RUN npm install

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 CMD curl -f http://localhost:8080/api || exit 1;

EXPOSE 8080
CMD [ "node", "index.js" ]
