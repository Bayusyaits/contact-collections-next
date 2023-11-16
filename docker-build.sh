#!/bin/sh

echo "pull origin master"
git pull origin master;
npm run build;
git fetch --tags ;
git checkout $(shell git describe --tags `git rev-list --tags --max-count=1`) ;
echo "build docker version" ;
docker build -t https://hub.docker.com/r/bayusyaits/contact-collection:$(shell node -p "require('./package.json').version") . ;
echo "build docker latest" ;
docker build -t https://hub.docker.com/r/bayusyaits/contact-collection:latest . ;

echo "run compose" ;
docker-compose up -d ;
echo "done" ;

exec "$@"
