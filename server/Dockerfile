FROM node:16.14-alpine
WORKDIR /server
RUN npm install 

ENV PATH="./node_modules/.bin:$PATH"
COPY package*.json ./
COPY . .
EXPOSE 4000
CMD [ "npm", "serve" ]