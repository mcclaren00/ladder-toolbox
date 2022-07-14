FROM node:16.14-alpine AS ui-build
WORKDIR /app
COPY client/ ./client/
RUN cd client && npm install && npm start

FROM node:16.14-alpine AS server-build
WORKDIR /app
COPY --from=ui-build /app/client/ ./client/
COPY server/package*.json ./server/
RUN cd server && npm install
EXPOSE 4000
CMD ["npm", "run", "serve"]
