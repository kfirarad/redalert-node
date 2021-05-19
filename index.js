/* eslint-disable no-console */
const mqtt = require('mqtt');
const axios = require('axios');

const interval = process.env.INTERVAL || 10000;
const mqttHost = process.env.MQTT_HOST || 'localhost';
const mqttPort = process.env.MQTT_PORT || 1883;
const mqttUser = process.env.MQTT_USER || '';
const mqttPass = process.env.MQTT_PASS || '';

const client = mqtt.connect(`mqtt://${mqttUser}:${mqttPass}@${mqttHost};${mqttPort}`);

client.on('connect', () => {
  console.log('Connected');
  client.publish('redalert/online', 'true');
});

process.on('exit', (code) => {
  client.publish('redalert/online', 'false');
  console.log(`About to exit with code: ${code}`);
  client.end();
});

const setState = (locations) => {
  locations.forEach((location) => {
    client.publish(`redalert/locations/${location}`, Date.now());
  });
  if (locations.length === 0) {
    client.publish('redalert/alert', 'off');
  } else {
    client.publish('redalert/alert', 'on');
  }
};

const callApi = () => {
  const config = {
    method: 'get',
    url: 'https://www.oref.org.il/WarningMessages/alert/alerts.json',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
      Referer: 'https://www.oref.org.il/',
    },
  };

  axios(config)
    .then(({ data = {} }) => {
      const { data: locations = [] } = data;
      setState(locations);
      console.log(JSON.stringify(locations));
    })
    .catch((error) => {
      console.log(error);
    }).finally(
      () => {
        setTimeout(callApi, interval);
      },
    );
};
callApi();
