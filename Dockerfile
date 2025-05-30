# === Stage 1: Build the NestJS app ===
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY nx.json ./
COPY apps ./apps
COPY libs ./libs

RUN npm install

# Build the NestJS app using Nx CLI
RUN npx nx build api

# === Stage 2: Run the built app ===
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/apps/api/dist ./dist
COPY package*.json ./

RUN npm install --omit=dev

CMD ["node", "dist/main.js"]
