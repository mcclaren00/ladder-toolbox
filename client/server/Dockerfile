FROM node:16.14-alpine
# ENV NODE_ENV=production
WORKDIR /client/server
ENV PATH="./node_modules/.bin:$PATH"
# COPY ["package.json", "package-lock.json*", "./"]
# RUN npm install --production
# RUN npm install
COPY . .
RUN npm install 
CMD [ "npm", "serve" ]