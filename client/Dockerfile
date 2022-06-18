FROM node:16.15-alpine
# ENV NODE_ENV=production
WORKDIR /client
ENV PATH="./node_modules/.bin:$PATH"
# COPY ["package.json", "package-lock.json*", "./"]
# RUN npm install --production
# RUN npm install
COPY . .
RUN npm install 
CMD [ "npm", "run", "start" ]