FROM node:16.14-alpine AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:16.14-alpine AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY api/package*.json ./api/
RUN cd api && npm install
COPY server/index.js ./server/

EXPOSE 4000

CMD ["npm", "run", "serve"]

