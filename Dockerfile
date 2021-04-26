#FROM node:alpine AS my-app-build
#WORKDIR /app
#COPY . .
#RUN npm install && npm run build
#
#FROM nginx:alpine
#COPY --from=my-app-build /app/dist/AlbumManager-angular /usr/share/nginx/html
#EXPOSE 80

### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/AlbumManager-angular /usr/share/nginx/html