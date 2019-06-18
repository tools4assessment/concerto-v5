#!/usr/bin/env bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push tools4assessment/concerto-v5:$TRAVIS_BRANCH
if [[ "$TRAVIS_BRANCH" = "master" ]]; then docker push tools4assessment/concerto-v5:latest; fi