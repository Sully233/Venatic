FROM node:slim
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g serve
RUN npm run build
COPY /build/. /app
EXPOSE 80
CMD ["serve", "-l", "80", "-s","build"]
