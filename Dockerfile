# Use Node.js as the base image
FROM node:20.15.0

# Set the working directory
WORKDIR /app

# Install build dependencies for bcrypt
RUN apt-get update && \
    apt-get install -y python3 make g++ build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copy and install server dependencies
COPY package*.json ./
RUN npm cache clean --force && \
    npm install --build-from-source

# Copy and install client dependencies
COPY client/package*.json ./client/
RUN npm install --prefix client

# Copy the application code
COPY . .

# Build the client
RUN npm run build --prefix client

# Expose the port
EXPOSE 3000

# Start the application (production)
CMD ["node", "server/index.js"]