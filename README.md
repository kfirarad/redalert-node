# redalert-node

## Introduction
Publishing the IDF's [Home-Front Command notifications](https://www.oref.org.il//12481-he/Pakar.aspx) to MQTT server

## Requierments
  1. Docker / Node 14
  2. MQTT server ( [mosquitto](https://github.com/eclipse/mosquitto) is a great option)

## How to use
  ### Docker
  The docker image build for the following arch: linux/amd64,linux/arm64,linux/arm/v7
  Using docker-compose
  1. Change the ENV variables in the .env file according to your configuration.
  * MQTT_HOST
  * MQTT_PORT
  * MQTT_USER
  * MQTT_PASS
  3. RUN `$ docker-compose up -d`
  
  or simple `docker run` command:
  
  ```$ docker run -e MQTT_HOST=127.0.0.1 -e MQTT_PORT=1883 -e MQTT_USER=mqtt -e MQTT_PASS=mqtt --name redalert kfir/redalert```
  
## Integration
### Home Assistant
Add a MQTT sensor to your configuration file. 
Use the HomeFront Command area name from the [notifications page](https://www.oref.org.il//12481-he/Pakar.aspx) 
<img width="561" alt="AreaDiscovery" src="https://user-images.githubusercontent.com/8081050/118860568-3bc8c600-b8e4-11eb-945a-f033989e34d5.png">

```
sensor:
  - platform: mqtt
    name: "Red Alert - Tel Aviv"
    state_topic: "redalert/locations/תל אביב - מרכז העיר"
    qos: 1
```

You can now use this sensor in an Automation, 
For exmaple:
```
alias: Red Alert - Tel Aviv
trigger:
  - platform: state
    entity_id: sensor.red_alert_tel_aviv
condition: []
action:
  - service: notify.notify
    data:
      message: Red Alert in Tel Aviv!
```
 
### PLEASE NOTE
I made this project for learning purposes.
It might not work as expected. 
I have no libality to use this script as a official notification system.
