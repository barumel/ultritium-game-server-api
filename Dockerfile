FROM node:12.16.2-stretch

RUN mkdir -p /srv/api

RUN set -ex; \
  apt-get update; \
  apt-get install -y \
   apt-transport-https \
   ca-certificates \
   curl \
   gnupg-agent \
   software-properties-common

RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -

RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"

RUN set -ex; \
  apt-get update; \
  apt-get install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io

RUN set -ex; \
  curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose; \
  chmod +x /usr/local/bin/docker-compose

WORKDIR /srv/api

COPY package*.json ./

COPY index.js ./

COPY src ./src

RUN npm install

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 CMD curl -f http://localhost:8080/api || exit 1;

EXPOSE 8080
CMD [ "node", "index.js" ]
