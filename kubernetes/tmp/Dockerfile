FROM debian:jessie-slim

ENV DEBIAN_FRONTEND noninteractive
ENV GCSFUSE_REPO gcsfuse-jessie

COPY script.sh /

WORKDIR /

RUN chmod +x script.sh

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates apt-utils curl gnupg kmod && \
    echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | \
    tee /etc/apt/sources.list.d/gcsfuse.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update && \
    apt-get install -y gcsfuse && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    mkdir /storage -p

CMD [ "bash", "script.sh" ]
