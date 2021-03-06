export default function(obj){
	obj.events = []
	
	obj.on = function(type, fn, context = this){
		var e = this.events.find(event => event.type === type);
		if(e) e = { type, fn };
		else this.events.push({ type, fn, context });
		return this;
	}

	obj.off = function(type){
		var index = this.events.findIndex(event => event.type === type);
		if(index < 0) return;
		else this.events.splice(index, 1);
		return this;
	}

	obj.trigger = function(type){
		var e = this.events.find(event => event.type === type);
		if(e) e.fn.apply(e.context, [].slice.call(arguments, 1));
	}
}