# Dockerfile
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy source code
COPY . .

# Build the app (optional, if using a compiled language like TS)
RUN pnpm build

# Expose API port
EXPOSE 3000

# Run the app
CMD ["pnpm", "start"]
