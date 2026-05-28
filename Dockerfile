# syntax=docker/dockerfile:1

FROM node:16-alpine

# Install native build deps for node-sass / etc.
RUN apk add --no-cache python3 make g++

WORKDIR /home/node

# Copy package manifests and install deps as root (or as node if you prefer)
COPY --chown=node:node package*.json ./

ENV NODE_OPTIONS="--max-old-space-size=4096"

USER node
RUN npm install --no-audit --no-fund

# Create cache dir (will be inside node_modules volume at runtime)
RUN mkdir -p node_modules/.cache


EXPOSE 3000
CMD ["npm", "run", "dev"]