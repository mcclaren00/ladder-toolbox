FROM node:16.16-alpine
WORKDIR /server
ENV PATH="./node_modules/.bin:$PATH"
# COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 4000
CMD [ "npm", "start" ]