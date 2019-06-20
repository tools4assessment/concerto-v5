!/usr/bin/env bash
set -x
opwd=$(pwd)
cd /home/concerto
oid=$(docker images | grep 'tools4assessment/concerto-v5.*latest' | awk '{print $3}')
out=$(docker pull tools4assessment/concerto-v5:latest)
opwd=$(pwd)
if [[ $out != *"Image is up to date"* ]];
then
  echo "re compose, delete old image"
  docker-compose down
  docker rmi $oid
  docker-compose up
else
  echo "up to date, no action"
  docker inspect --format "{{.Id}}"  $oid
fi
cd $opwd
exit 0
