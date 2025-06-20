FROM node:16.14-buster

LABEL maintainer="tech1@sumomedia.co"
LABEL app_environment="development"

WORKDIR /home/node

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install npm globally and dependencies
RUN npm install -g npm@8.5.0

COPY . .

USER node

CMD bash -c "npm install && npm run dev"

EXPOSE 3000