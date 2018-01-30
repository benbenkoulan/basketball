const slice = Array.prototype.slice;

export default class Observer {
	constructor(){
		this.events = [];
	}

	on(type, handler, context = this){
		let event = this.events.find(event => event.type === type);
		if(!event) this.push({ type, handler, context });
		event.handler = handler;
		return this;
	}

	off(type){
		let index = this.events.findIndex(event => event.type === type);
		if(index > -1) this.events.splice(index, 1);
		return this;
	}

	emit(type){
		let event = this.events.find(event => event.type === type);
		if(event) {
			let args = slice.call(arguments, 1);
			event.handler.apply(event.context, args);
		}
	}

	once(type, handler, context = this){
		function one(){
			handler.apply(this, arguments);
			this.off(type);
		}
		this.on(type, one, context);
	}
}