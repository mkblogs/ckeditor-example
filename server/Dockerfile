FROM node:18

WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

RUN npm install

# Copy the rest of the server code
COPY . .

EXPOSE 3000

CMD ["node", "index.js"] 