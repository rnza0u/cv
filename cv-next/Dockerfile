FROM node:23-alpine3.20
USER node
WORKDIR /app
COPY . /app/
RUN npm ci
ENTRYPOINT ["./node_modules/.bin/next", "start"]