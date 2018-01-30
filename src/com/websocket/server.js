const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const WEBSOCKET_PORT = 1000;

var wss;

function WSS(){
	this.events = [];
	const _wss = new WebSocketServer({ port: WEBSOCKET_PORT });
	const self = this;
	_wss.on('connection', function(ws){
		ws.on('message', function(message){
			self.emit('incoming', ws, message);
		});
		ws.on('error', function(err){
			console.log('-----error-----------');
			console.log(err);
		});
		self.emit('connection', ws);
	});
	this._wss = _wss;
}

WSS.prototype = {
	on: function(type, handler, context){
		context = context || this;
		let event = this.events.find(function(event){
			return event.type === type;
		});
		if(!event) this.push({ type, handler, context });
		event.handler = handler;
		return this;
	},

	off: function(type){
		let index = this.events.findIndex(function(event){
			return event.type === type;
		});
		if(index > -1) this.events.splice(index, 1);
		return this;
	},

	emit: function(type){
		let event = this.events.find(function(event){
			return event.type === type;
		});
		if(event) {
			let args = slice.call(arguments, 1);
			event.handler.apply(event.context, args);
		}
	},

	boradcast: function(){
		const _wss = this._wss;
		_wss.clients.forEach(function(client){
			if(WebSocket.OPEN === client.readyState){
				client.send(data);
			}
		})
	}
}

module.exports = {
	getWSS: function(){
		if(!wss) {
			wss = new WSS();
		}
		return wss;
	}
}