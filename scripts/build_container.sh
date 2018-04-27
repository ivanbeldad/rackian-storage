#!/bin/bash

if [ -n "$TRAVIS_TAG" ]; then
  VERSION="$TRAVIS_TAG"
else
  VERSION="latest"
fi

CONTAINER=ivandelabeldad/rackian-api
CONTAINER_TAG="$CONTAINER:$VERSION"

# Authenticate in docker hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

if [ -n "$TRAVIS_TAG" ]; then
  VERSION="$TRAVIS_TAG"
else
  VERSION="latest"
fi

# create container
docker build . --tag $CONTAINER_TAG

# send to docker repository
docker push $CONTAINER_TAG
