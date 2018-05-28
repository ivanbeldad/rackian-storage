#!/bin/bash

# Set absolute path to build dir
if [ -n "$TRAVIS_BUILD_DIR" ]; then
  BUILD_DIR="$TRAVIS_BUILD_DIR"
else
  BUILD_DIR="$PWD"
fi

##########################################################################
########################## INSTALL DEPENDENCIES ##########################
##########################################################################

# Bin directory
BIN_DIR=${HOME}/bin

# Create bin folder and add it to path
mkdir $BIN_DIR -p
export PATH=$PATH:$BIN_DIR

# If the SDK is not already cached, download it and unpack it
if [ ! -d ${HOME}/google-cloud-sdk/bin ]
then
  rm -rf ${HOME}/google-cloud-sdk
  export CLOUDSDK_CORE_DISABLE_PROMPTS=1
  curl https://sdk.cloud.google.com | bash;
  source ${HOME}/google-cloud-sdk/path.bash.inc
fi

# Install gsutil
gcloud components install gsutil

# Install Kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.9.0/bin/linux/amd64/kubectl
mv kubectl $BIN_DIR/
chmod +x $BIN_DIR/kubectl

# Install Helm
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get | bash


##########################################################################
############################### CREDENTIALS ##############################
##########################################################################

# Credentials directory
CREDENTIALS_DIR=${HOME}/credentials

# Create credentials directory
mkdir $CREDENTIALS_DIR

# Decrypt credentials of gcloud
openssl aes-256-cbc -K $encrypted_a89191c56639_key -iv $encrypted_a89191c56639_iv \
-in $BUILD_DIR/rackian-cloud-1-travis-secret.json.enc \
-out $CREDENTIALS_DIR/rackian-cloud-1-travis-secret.json -d

# Use decrypted service account credentials to authenticate gcloud, set project and zone
gcloud auth activate-service-account --key-file $CREDENTIALS_DIR/rackian-cloud-1-travis-secret.json
gcloud config set project rackian-cloud-1
gcloud config set compute/zone europe-west1-b

# Authenticate kubectl using gcloud
gcloud container clusters get-credentials rackian-cloud-cluster


##########################################################################
################################ DEPLOYMENT ##############################
##########################################################################

if [ -n "$TRAVIS_TAG" ]; then
  ENVIRONMENT="production"
  VERSION="$TRAVIS_TAG"
else
  ENVIRONMENT="staging"
  VERSION="latest"
fi

# Set variables
NAMESPACE="rackian-cloud"
CHART_DIR="$BUILD_DIR/chart/rackian-api"
GCS_PROTOCOL="gs"
GCS_BUCKET="rackian-cloud"

if [ $ENVIRONMENT = "production" ]; then
  RELEASE_NAME="rackian-api"
  SECRET_PATH="$CHART_DIR/values.secret.yaml"
  GCS_SECRET="storage/values.secret.yaml"
  GCS_SECRET_PATH="$GCS_PROTOCOL://$GCS_BUCKET/$GCS_SECRET"
else
  RELEASE_NAME="rackian-api-staging"
  SECRET_PATH="$CHART_DIR/values.secret.staging.yaml"
  GCS_SECRET="storage/values.secret.staging.yaml"
  GCS_SECRET_PATH="$GCS_PROTOCOL://$GCS_BUCKET/$GCS_SECRET"
fi

# copy secret values from gcs
gsutil cp $GCS_SECRET_PATH $SECRET_PATH
# set value files
VALUES=$CHART_DIR/values.staging.yaml,$SECRET_PATH
# set other values
SETTED="environment=$ENVIRONMENT,deployment.imageVersion=$VERSION"

# upgrade tiller before deploy
helm init --upgrade

# deploy to kubernetes cluster
helm upgrade $RELEASE_NAME $CHART_DIR \
  --namespace $NAMESPACE \
  --install \
  --values $VALUES \
  --set $SETTED \
  --recreate-pods
