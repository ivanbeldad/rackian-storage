#!/bin/bash

# Bin directory
BIN_DIR=${HOME}/bin

# Create bin folder and add it to path
mkdir $BIN_DIR
export PATH=$BIN_DIR:$PATH

# If the SDK is not already cached, download it and unpack it
if [ ! -d ${HOME}/google-cloud-sdk/bin ]; then
  rm -rf ${HOME}/google-cloud-sdk
  export CLOUDSDK_CORE_DISABLE_PROMPTS=1
  curl https://sdk.cloud.google.com | bash;
  source ${HOME}/google-cloud-sdk/path.bash.inc
fi

# Install Kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.9.0/bin/linux/amd64/kubectl
mv kubectl $BIN_DIR/
chmod +x $BIN_DIR/kubectl
