# Stage 1: Build
FROM node:18-slim AS build

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build

# Stage 2: Run
FROM node:18-slim

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --production

EXPOSE 8080

CMD ["node", "dist/index.js"]
