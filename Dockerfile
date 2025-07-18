# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the rest of the source code
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --output-path=dist

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built app to Nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config (for Angular routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 
