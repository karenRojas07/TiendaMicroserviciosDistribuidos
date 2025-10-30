# Dockerfile para microservicios Node + TypeScript
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig*.json ./
COPY src ./src

EXPOSE 3003

CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/index.ts"]
