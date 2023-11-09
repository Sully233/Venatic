FROM node:slim as builder
WORKDIR /app
COPY . .
RUN npm install -g serve
CMD ["serve", "-s", "build" ]
