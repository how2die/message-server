FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .

FROM node:alpine
COPY --from=build /app /app
WORKDIR /app
EXPOSE 8080
CMD ["server.js"]
