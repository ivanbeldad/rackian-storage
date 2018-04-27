#!/bin/bash

if [ -n "$TRAVIS_TAG" ]; then
  VERSION="$TRAVIS_TAG"
else
  VERSION="latest"
fi

CONTAINER=ivandelabeldad/rackian-api
CONTAINER_TAG="$CONTAINER:$VERSION"

# create container
docker build . --tag $CONTAINER_TAG
# send to docker repository
docker push $CONTAINER_TAG
