# syntax=docker/dockerfile:1
FROM node:16.14-buster

LABEL maintainer="tech1@sumomedia.co"
LABEL app_environment="development"

WORKDIR /home/node

COPY package*.json ./

RUN npm install -g npm@8.5.0 && \
    npm install --no-audit --no-fund

COPY . .

USER node

EXPOSE 3000

CMD bash -c "npm install && npm run dev"
