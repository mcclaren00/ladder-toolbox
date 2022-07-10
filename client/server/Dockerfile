FROM node:16.14-alpine
WORKDIR /client/server
# ENV PATH="./node_modules/.bin:$PATH"
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 5000
CMD [ "npm", "serve" ]