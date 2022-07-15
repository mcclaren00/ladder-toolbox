FROM node:18.6-alpine
WORKDIR /server
ENV PATH="./node_modules/.bin:$PATH"
# COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 4000
CMD [ "npm", "start" ]