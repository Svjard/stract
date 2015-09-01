'use strict';

/* exported MessageBus */
import Register from '../utils/register.js';

/**
 * This class is handling the Websocket exchange
 */
class StractWebsocket {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($websocket, $location, $window) {

    this.$window = $window;
    this.$websocket = $websocket;
    this.wsBaseUrl = 'ws://' + $location.host() + ':' + $location.port() + '/api/ws/';
    this.sockets = new Map();
  }

  getBus(workspaceId) {
    var currentBus = this.sockets.get(workspaceId);
    if (!currentBus) {
      // needs to initialize
      var url = this.wsBaseUrl + workspaceId + '?token=' + this.$window.sessionStorage['stractToken'];
      var dataStream = this.$websocket(url);
      var bus = new MessageBus(dataStream);
      this.sockets.set(workspaceId, bus);
      currentBus = bus;
    }
    return currentBus;
  }
}

class MessageBuilder {

  constructor(method, path) {
    this.TYPE = 'x-everrest-websocket-message-type';
    if (method) {
      this.method = method;
    } else {
      this.method = 'POST';
    }

    if (path) {
      this.path = path;
    } else {
      this.path = null;
    }

    this.message = {};
    // add uuid
    this.message.uuid = this.buildUUID();

    this.message.method = this.method;
    this.message.path = this.path;
    this.message.headers = [];
    this.message.body;
  }

  subscribe(channel) {
    var header = {name: this.TYPE, value: 'subscribe-channel'};
    this.message.headers.push(header);
    this.message.body = JSON.stringify({channel: channel});
    return this;
  }

  unsubscribe(channel) {
    var header = {name:this.TYPE, value: 'unsubscribe-channel'};
    this.message.headers.push(header);
    this.message.body = JSON.stringify({channel: channel});
    return this;
  }

  build() {
    return this.message;
  }

  buildUUID() {
    var time = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (match) => {
      var rem = (time + 16 * Math.random()) % 16 | 0; // jshint ignore:line
      time = Math.floor(time / 16);
      return (match === 'x' ? rem : rem & 7 | 8).toString(16); // jshint ignore:line
    });
  }
}

class MessageBus { // jshint ignore:line
  constructor(datastream) {
    this.datastream = datastream;

    this.subscribersByChannel = new Map();


    this.datastream.onMessage((message) => {this.handleMessage(message);});
  }

  /**
   * Subscribes a new callback which will listener for messages sent to the specified channel.
   * Upon the first subscribe to a channel, a message is sent to the server to
   * subscribe the client for that channel. Subsequent subscribes for a channel
   * already previously subscribed to do not trigger a send of another message
   * to the server because the client has already a subscription, and merely registers
   * (client side) the additional handler to be fired for events received on the respective channel.
   */
  subscribe(channel, callback) {
    // already subscribed ?
    var existingSubscribers = this.subscribersByChannel.get(channel);
    if (!existingSubscribers) {
      // register callback

      var subscribers = [];
      subscribers.push(callback);
      this.subscribersByChannel.set(channel, subscribers);

      // send subscribe order
      this.send(new MessageBuilder().subscribe(channel).build());
    } else {
      // existing there, add only callback
      existingSubscribers.push(callback);
    }
  }

  /**
   * Unsubscribes a previously subscribed handler listening on the specified channel.
   * If it's the last unsubscribe to a channel, a message is sent to the server to
   * unsubscribe the client for that channel.
   */
  unsubscribe(channel) {
    // already subscribed ?
    var existingSubscribers = this.subscribersByChannel.get(channel);
    // unable to cancel if not existing channel
    if (!existingSubscribers) {
      return;
    }

    if (existingSubscribers > 1) {
      // only remove callback
      for(let i = 0; i < existingSubscribers.length; i++) {
          delete existingSubscribers[i];
      }
    } else {
      // only one element, remove and send server message
      this.subscribersByChannel.delete(channel);

      // send unsubscribe order
      this.send(new MessageBuilder().unsubscribe(channel).build());
    }
  }

  send(message) {
    var stringified = JSON.stringify(message);
    this.datastream.send(stringified);
  }

  handleMessage(message) {
    // handling the receive of a message
    // needs to parse it
    var jsonMessage = JSON.parse(message.data);

    // get headers
    var headers = jsonMessage.headers;

    var channelHeader;
    // found channel headers
    for(let i = 0; i < headers.length; i++) {
      let header = headers[i];
      if ('x-everrest-websocket-channel' === header.name) {
        channelHeader = header;
        continue;
      }
    }

    if (channelHeader) {
      // message for a channel, look at current subscribers
      var subscribers = this.subscribersByChannel.get(channelHeader.value);
      if (subscribers) {
        subscribers.forEach((subscriber) => {
          subscriber(JSON.parse(jsonMessage.body));
        });
      }
    }
  }
}


// Register this factory
Register.getInstance().factory('stractWebsocket', StractWebsocket);
