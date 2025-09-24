# Base image
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use an Nginx base image for serving the static content
FROM nginx:latest

# Copy the build files to Nginx server's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow access to the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
