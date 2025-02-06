# Step 1: Use the official Node image to build the app
FROM node:16 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the frontend app
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Use a lighter image to serve the built app
FROM nginx:alpine

# Step 8: Copy the build folder to nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 for nginx to serve the React app
EXPOSE 80

# Step 10: Start nginx server
CMD ["nginx", "-g", "daemon off;"]
