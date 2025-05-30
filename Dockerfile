# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with npm
RUN npm install --production

# Copy the rest of the application
COPY . .

# Build the NestJS app (adjust path if needed)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/apps/api/main"]
