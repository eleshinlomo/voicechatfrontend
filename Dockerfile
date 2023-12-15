FROM node:20-alpine


WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json .

COPY package-lock.json .

# Install dependencies
RUN npm install --production \
    npm run build



COPY . /app


EXPOSE 3000










