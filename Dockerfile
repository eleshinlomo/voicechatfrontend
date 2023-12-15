FROM node:20-alpine


WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json .

COPY package-lock.json .

# Install dependencies
RUN npm install --production \
    npm run build

ARG NEXT_PUBLIC_BASE_URL http://localhost:8000 

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL


COPY . /app


EXPOSE 3000

CMD ["npm", "run", "start"]










