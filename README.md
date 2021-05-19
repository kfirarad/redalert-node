# redalert-node

## Introduction
Publishing the IDF's [Home-Front Command notifications](https://www.oref.org.il//12481-he/Pakar.aspx) to MQTT server

## How to use
  ### Docker
  The docker image build for the following arch: linux/amd64,linux/arm64,linux/arm/v7
  Using docker-compose
  1. Change the ENV variables in the docker-compose.yml file according to your configuration.
  2. RUN `$ docker-compose up -d`
  
  or simple `docker run` command:
  
  ```$ docker run -e MQTT_HOST=127.0.0.1 -e MQTT_PORT=1883 -e MQTT_USER=mqtt -e MQTT_PASS=mqtt --name redalert kfir/redalert```
  
  
 
### PLEASE NOTE
I made this project for learning purposes.
It might not work as expected. 
I have no libality to use this script as a official notification system.
