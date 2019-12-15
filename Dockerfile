FROM node:alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .

FROM node:alpine
COPY --from=build /usr/src/app /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8080
CMD ["server.js"]
