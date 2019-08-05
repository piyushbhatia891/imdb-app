FROM nginx:1.15.8-alpine
## Remove default nginx website
FROM node:12.2.0

WORKDIR /imdb-app
RUN npm install
RUN npm install -g @angular/cli@7.3.9
RUN $(npm bin)/ng build --prod

RUN rm -rf /usr/share/nginx/html/*
## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]