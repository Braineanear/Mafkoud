# ---------- Base ----------
FROM node:14-alpine AS base

WORKDIR /app

# ---------- Builder ----------
FROM base AS builder

COPY package*.json .babelrc config.env process.json ./

RUN npm install

RUN npm install pm2 -g

COPY ./src ./src

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "pm2" ]
