FROM node:16.14-alpine as build-stage 
# ENV NODE_ENV=production
WORKDIR /client
RUN npm install
ENV PATH="./node_modules/.bin:$PATH"

# COPY ["package.json", "package-lock.json*", "./"]
# RUN npm install --production
# RUN npm install
COPY . .
# ENV REACT_APP_baseAPIURL=<backend-app-service-ip>:<port>
EXPOSE 3000
CMD ["npm", "start"]