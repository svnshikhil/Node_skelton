FROM node:10-alpine

RUN mkdir /myapp
WORKDIR /myapp

COPY ./package.json .
COPY ./package-lock.json .
COPY ./.env .
RUN mkdir tmp

RUN npm cache clean --force
RUN rm -rf ~/.npm
RUN rm -rf node_modules
RUN rm -f package-lock.json
RUN npm install -g npm@latest && npm install
RUN npm install -g nodemon

EXPOSE 3001