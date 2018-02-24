#!/bin/bash

if [ -z "$TRAVIS_BUILD_DIR" ]; then
  TRAVIS_BUILD_DIR=$PWD
fi

# Credentials directory
CREDENTIALS_DIR=${HOME}/credentials

# Create credentials directory
mkdir $CREDENTIALS_DIR

# Decrypt credentials of gcloud
openssl aes-256-cbc -K $encrypted_a89191c56639_key -iv $encrypted_a89191c56639_iv \
-in $TRAVIS_BUILD_DIR/rackian-cloud-1-travis-secret.json.enc \
-out $CREDENTIALS_DIR/rackian-cloud-1-travis-secret.json -d

# Use decrypted service account credentials to authenticate gcloud, set project and zone
gcloud auth activate-service-account --key-file $CREDENTIALS_DIR/rackian-cloud-1-travis-secret.json
gcloud config set project rackian-cloud-1
gcloud config set compute/zone europe-west1-b

# Authenticate kubectl using gcloud
gcloud container clusters get-credentials rackian-cloud-cluster

# Authenticate in docker hub
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
