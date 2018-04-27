#!/bin/bash

if [ -z "$TRAVIS_BUILD_DIR" ]; then
  TRAVIS_BUILD_DIR=$PWD
fi

chmod +x $TRAVIS_BUILD_DIR/scripts/deploy/credentials.sh
chmod +x $TRAVIS_BUILD_DIR/scripts/deploy/install_dependencies.sh
chmod +x $TRAVIS_BUILD_DIR/scripts/deploy/deploy_k8s.sh

source $TRAVIS_BUILD_DIR/scripts/deploy/credentials.sh
source $TRAVIS_BUILD_DIR/scripts/deploy/install_dependencies.sh
source $TRAVIS_BUILD_DIR/scripts/deploy/deploy_k8s.sh
