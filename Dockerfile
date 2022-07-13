FROM node:16.14-alpine AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install

FROM node:16.14-alpine AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/client/ ./client/
COPY server/package*.json ./server/
RUN cd api && npm install
COPY server/index.js ./server/

EXPOSE 4000

CMD ["npm", "run", "serve"]

