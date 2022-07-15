FROM node:16.14-alpine as build-stage 
# ENV NODE_ENV=production
WORKDIR /client
ENV PATH="./node_modules/.bin:$PATH"
RUN npm install --production
# COPY ["package.json", "package-lock.json*", "./"]
# RUN npm install --production
# RUN npm install
COPY . .
# ENV REACT_APP_baseAPIURL=<backend-app-service-ip>:<port>
RUN npm build 
FROM nginx:alpine
COPY --from=build-stage /client/build /usr/share/nginx/html
EXPOSE 80