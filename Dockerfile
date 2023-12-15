FROM node:20-alpine


WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install --production

COPY . .

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL


EXPOSE 3000








