FROM node:8.9

# set debian to non-interactive mode
ENV DEBIAN_FRONTEND noninteractive

# gcsfuse version
ENV GCSFUSE_REPO gcsfuse-jessie

LABEL maintainer="Ivan de la Beldad Fernandez <ivandelabeldad@gmail.com>"

EXPOSE 10001

COPY . /app

WORKDIR /app

RUN \
    # install requirements for gcsfuse
    apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates apt-utils curl gnupg kmod \
    # add gcsfuse repo
    && echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | \
        tee /etc/apt/sources.list.d/gcsfuse.list \
    # install google key
    && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - \
    # install gcsfuse
    && apt-get update \
    && apt-get install -y gcsfuse \
    # clean up
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    # install npm dependencies
    && npm install --production --silent \
    # ensure storage is an empty folder
    && rm -rf /app/storage && mkdir /app/storage -p

CMD [ "node", "src/main.js" ]
