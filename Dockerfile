# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Declare build arguments
ARG MONGO_URI
ARG AWS_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG NEXT_PUBLIC_S3_BUCKET
ARG NEXT_PUBLIC_S3_BASE_URL

# Convert them to environment variables inside the container
ENV MONGO_URI=$MONGO_URI
ENV AWS_REGION=$AWS_REGION
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV NEXT_PUBLIC_S3_BUCKET=$NEXT_PUBLIC_S3_BUCKET
ENV NEXT_PUBLIC_S3_BASE_URL=$NEXT_PUBLIC_S3_BASE_URL

# Copy package.json and package-lock.json first to leverage Docker's caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure the installation directory for global packages has the correct permissions
RUN npm config set prefix /usr/local && chmod -R 755 /usr/local

# Install Next.js globally
RUN npm install -g next

# Install Git (if needed for your application)
RUN apt-get update && apt-get install -y git && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application files
COPY . .

# Fix permission issues for the app directory
RUN chmod -R 755 /app

# Build the Next.js application
RUN npx next build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]



