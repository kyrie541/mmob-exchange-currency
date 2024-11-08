# Stage 1: Build the Vue 3 app
FROM node:18-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built files
FROM nginx:alpine AS production-stage

# Copy built files from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to access the application
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
