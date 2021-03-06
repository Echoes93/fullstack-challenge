#!/bin/bash

# install latest version of docker the lazy way
curl -sSL https://get.docker.com | sh

# make it so you don't need to sudo to run docker commands
usermod -aG docker ubuntu

# install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# copy the dockerfile into /srv/docker 
mkdir /srv/docker
curl -o /srv/docker/docker-compose.yml https://raw.githubusercontent.com/Echoes93/fullstack-challenge/master/docker-compose.prod.yml

# create file for storing tls info
touch /srv/docker/acme.json
chmod 600 /srv/docker/acme.json

# copy in systemd unit file and register it so our compose file runs 
# on system restart
curl -o /etc/systemd/system/docker-compose-app.service https://raw.githubusercontent.com/Echoes93/fullstack-challenge/master/csv-challenge.service
systemctl enable csv-challenge

# start up the application via docker-compose
docker-compose -f /srv/docker/docker-compose.yml up -d