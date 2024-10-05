# Step 1: Build the Angular application
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files and build the Angular app
COPY . .
RUN npm run build --prod

# Step 2: Use NGINX to serve the application
FROM nginx:alpine

# Copy the built Angular files from the builder stage to NGINX's HTML directory
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Optional: Add custom NGINX configuration (nginx.conf)
COPY webserver/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
