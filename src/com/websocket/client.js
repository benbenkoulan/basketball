import Observer from 'modules/Observer'

const WEBSOCKET_PORT = 2000;

export default class WSC extends Observer {
	constructor(){
		super();
		this.mq = [];
		this.open();
	}

	open(){
		const url = location.protocol.indexOf('https:') > -1 ? 'wss:' : 'ws:' + location.hostname + ':' + WEBSOCKET_PORT;
		const _wsc = new WebSocket(url);

		_wsc.onopen = e => {
			while(this.mq.length) this.send(this.mq.shift());
			this.emit('open');
		}

		_wsc.onmessage = e => {
			let data = e.data;
			try{
				data = JSON.parse(data);
			} catch(e){
			}
			this.emit('message', data);
		}

		_wsc.onerror = e => {
			this.emit('error', e);
		}

		_wsc.onclose = e => {
			this.emit('close', e);
		}

		this._wsc = _wsc;
	}

	send(data){
		const _wsc = this._wsc;
		const _data = typeof data === 'object' ? JSON.stringify(data) : data;

		if(_wsc.readyState !== WebSocket.OPEN){
			this.mq.push(_data);
			return;
		}
		_wsc.send(_data);
	}
}