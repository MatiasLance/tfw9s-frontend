FROM node:16.14-buster

LABEL maintainer="tech1@sumomedia.co"
LABEL app_environment="development"

WORKDIR /home/node
COPY . /home/node/

RUN npm i -g npm@8.5.0

CMD bash -c "npm install && npm run dev"

EXPOSE 3000
