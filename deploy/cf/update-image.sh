#!/usr/bin/env bash
set +x
opwd=$(pwd)
cd /home/concerto
oid=$(docker images | grep 'tools4assessment/concerto-v5.*master' | awk '{print $3}')
cid=$(docker container ls -a | grep 'tools4assessment/concerto-v5.*master' | awk '{print $1}')
out=$(docker pull tools4assessment/concerto-v5:master)
opwd=$(pwd)
if [[ $out != *"Image is up to date"* ]];
then
  echo "Stop and remove container of Concerto, delete old image, restart Concerto from new image. "
  docker stop $cid
  docker container rm $cid
  docker rmi $oid
  docker-compose up -d concerto
else
  echo "Image is up to date, no action needed. "
  docker inspect --format "{{.Id}}" $oid
fi
cd $opwd
exit 0
