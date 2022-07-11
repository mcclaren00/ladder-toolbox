FROM node:16.14-alpine
WORKDIR /server
ENV PATH="./node_modules/.bin:$PATH"
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 4000
CMD [ "npm", "serve" ]