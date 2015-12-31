/*
*  WsMidi.js is designed to work with the jWsMidiServer.
*  These objects abstract the WebSocket connection
*  to the server, the messaging to and from the server,
*  and MIDI message formatting.
*/

var WsMidi = {};

//Status Commands
//see Java ShortMessage class
var StatusCommand = {
  NOTE_OFF: 128,
  NOTE_ON: 144,
  POLY_PRESSURE: 160,
  CONTROL_CHANGE: 176,
  PROGRAM_CHANGE: 192,
  CHANNEL_PRESSURE: 208,
  PITCH_BEND: 224
};

/*************************************************
 *               MIDI CONNECTION                 *
 *************************************************/
function Connection (params) {
  if (params.ip == undefined) params.ip = location.host;
  if (params.port == undefined) params.port = 8080;
  this.socket;
  this.socketIsConnected = false;
  this.connectToServer(params.ip, params.port);
  this.hasNotification = false;
  if (typeof(params.notify) === 'function') {
    this.notify = params.notify;
    this.hasNotification = true;
  }
}

Connection.prototype = {

  send: function (msg) {
    if (this.socketIsConnected) {
      if (!(msg instanceof Message)) {
        throw 'can only send a WsMidi.Message object';
        return;
      }
      try {
        this.socket.send(msg.toString());
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      throw 'socket not connected';
    }
  },

  connectToServer: function (ip, port) {
    try {
      var socketString = 'ws://' + ip + ':' + port;
      this.socket = new WebSocket(socketString);
      var self = this;
      this.socket.onopen = function(){
        console.log('socket status: ', 'connected');
        self.socketIsConnected = true;
      }
      this.socket.onclose = function(){
        console.log('socket status: ', 'closed');
        self.socketIsConnected = false;
      }
      this.socket.onmessage = function(msg){
        //---UNPACK AND CREATE MESSAGE OBJECT---//
        var data = msg.data.split(',');
        if (self.hasNotification) {
          self.notify(new Message(data[0], data[1], data[2], data[3]));
        }
      }
    } catch(err) {
      console.log('websocket connection err: ', err);
      throw new Error('Websocket connection error', err);
    }
  }

};


/*************************************************
 *                MIDI MESSAGE                   *
 *      This message format is designed to be    *
 *      comparable to the Java MIDI              *
 *      ShortMessage class.                      *
 *************************************************/
function Message (status, channel, data1, data2) {
  this.data = new Uint8ClampedArray(4);
  if (status != undefined) this.setCommand(status);
  if (channel != undefined) this.setChannel(channel);
  if (data1 != undefined) this.setData1(data1);
  if (data2 != undefined) this.setData2(data2);
}

Message.prototype = {

  getCommand: function () {
    return this.data[0];
  },

  setCommand: function (val) {
    this.data[0] = val;
  },

  getChannel: function () {
    return this.data[1];
  },

  setChannel: function (val) {
    if (val > 15) val = 15;
    this.data[1] = val;
  },

  getData1: function () {
    return this.data[2];
  },

  setData1: function (val) {
    if (val > 127) val = 127;
    this.data[2] = val;
  },

  getData2: function () {
    return this.data[3];
  },

  setData2: function (val) {
    if (val > 127) val = 127;
    this.data[3] = val;
  },

  toString: function () {
    return this.data[0] + ',' + this.data[1] + ',' +
           this.data[2] + ',' + this.data[3];
  }

};

WsMidi.Connection = Connection;
WsMidi.Message = Message;
WsMidi.StatusCommand = StatusCommand;

export default WsMidi;
