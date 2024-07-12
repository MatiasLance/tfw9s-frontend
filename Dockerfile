FROM node:16.14-buster

LABEL mailto:maintainer="tech1@sumomedia.co"
LABEL app_environment="development"

WORKDIR /home/node

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install npm globally and dependencies
RUN npm install -g bun

RUN bun install

COPY . .

CMD bash -c "bun install && bun run dev"

EXPOSE 3000
