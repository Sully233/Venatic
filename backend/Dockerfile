FROM node:slim
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install pm2 -g
COPY . /app
EXPOSE 80
CMD [ "pm2-runtime", "npm", "--", "start" ]
