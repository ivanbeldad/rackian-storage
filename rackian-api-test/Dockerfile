FROM node:8.9

LABEL maintainer="Ivan de la Beldad Fernandez <ivandelabeldad@gmail.com>"

ADD . /app

WORKDIR /app

RUN npm install --silent

ARG PORT

EXPOSE 10001

CMD [ "npm", "test" ]
