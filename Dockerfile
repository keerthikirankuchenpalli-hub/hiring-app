# Use Node.js v18 base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port for app
EXPOSE 4000

# Set environment variables defaults
ENV PORT=4000

# Run the app
CMD ["npm", "run", "start"]
