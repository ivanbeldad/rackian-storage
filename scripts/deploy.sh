#!/bin/bash

if [ -n "$TRAVIS_TAG" ]
then
  ENVIRONMENT="production"
  VERSION="$TRAVIS_TAG"
else
  ENVIRONMENT="staging"
  VERSION="latest"
fi

NAMESPACE="rackian-cloud"

CONTAINER=ivandelabeldad/rackian-api
CONTAINER_TAG="$CONTAINER:$VERSION"

CHART_DIR=$TRAVIS_BUILD_DIR/chart/rackian-api
SECRET_PATH="$CHART_DIR/values.secret.yaml"
SECRET_PATH_STAGING="$CHART_DIR/values.secret.staging.yaml"

GCS_PROTOCOL="gs"
GCS_BUCKET="rackian-cloud"
GCS_SECRET="values.secret.yaml"
GCS_SECRET_PATH="$GCS_PROTOCOL://$GCS_BUCKET/$GCS_SECRET"
GCS_SECRET_STAGING="values.secret.staging.yaml"
GCS_SECRET_PATH_STAGING="$GCS_PROTOCOL://$GCS_BUCKET/$GCS_SECRET_STAGING"

function staging {
  # copy secret values from gcs
  gsutil cp $GCS_SECRET_PATH_STAGING $SECRET_PATH_STAGING
  # set release_name
  RELEASE_NAME=rackian-api-staging
  # set value files
  VALUES=$CHART_DIR/values.staging.yaml,$SECRET_PATH_STAGING
  # set runtime values
  SETTED="environment=$ENVIRONMENT"
  # deploy
  deploy $RELEASE_NAME $VALUES $SETTED
}

function production {
  # copy secret values from gcs
  gsutil cp $GCS_SECRET_PATH $SECRET_PATH
  # set release_name
  RELEASE_NAME=rackian-api
  # set value files
  VALUES=$CHART_DIR/values.yaml,$SECRET_PATH
  # set runtime values
  SETTED="environment=$ENVIRONMENT,deployment.imageVersion=$TRAVIS_TAG"
  # deploy
  deploy $RELEASE_NAME $VALUES $SETTED
}

function deploy {
  # create container
  docker build . --tag $CONTAINER_TAG
  # send to docker repository
  docker push $CONTAINER_TAG

  # deploy to kubernetes cluster
  helm upgrade $RELEASE_NAME $CHART_DIR \
    --namespace $NAMESPACE \
    --install \
    --values $VALUES \
    --set $SETTED \
    --dry-run --debug
}

# check if should create staging or production
if [ $ENVIRONMENT = "production" ]
then
  production
else
  staging
fi
