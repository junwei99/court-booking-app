#stage 1: bulding the code
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#stage 2: running the code
FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/app/dist ./dist

# Ensure schema.prisma is in the dist folder
COPY src/prisma/schema.prisma dist/src/prisma/

COPY .env .

EXPOSE 8080

CMD [ "node", "dist/src/index.js" ]