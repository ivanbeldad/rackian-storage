FROM node:8.9

LABEL maintainer="Ivan de la Beldad Fernandez <ivandelabeldad@gmail.com>"

ADD . /app

WORKDIR /app

RUN npm install --production

ARG PORT

EXPOSE $PORT

CMD [ "npm", "start" ]
