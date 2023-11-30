# Use a Node base image
FROM node:20.10.0

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . ./

# Expose port and start application
EXPOSE 3000
CMD ["node", "app.js"]
