FROM node:20-alpine


WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json .

COPY package-lock.json .

# Install dependencies
RUN npm install --production \
    npm run build



COPY . /app

ARG NEXT_PUBLIC_BASE_URL_PROD="voicechatbot-production.up.railway.app"

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL_PROD


EXPOSE 3000

CMD ["npm", "run", "start", "--", "--port", "3000"]








