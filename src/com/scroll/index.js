import { setTransform, getTransform, setDuration } from './dom'
import eventExtend from 'utils/event-extend'
import { requestAnimationFrame, cancelAnimationFrame } from 'utils/raf'

var properties = ['deceleration', 'noBounce', 'wheel', 'slide', 'loop', 'noOutOfBounds', 'step', 'name', 'vertical', 'max', 'min']

function Scroll(el, options){
	this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.deceleration = options.deceleration || 0.006;	//参考减速度

	this.noOutOfBounds = !!options.noOutOfBounds; //不能越界
	this.noBounce = !!options.noBounce;	//弹性效果
	this.wheel = !!options.wheel;	//滚动轮效果
	this.slide = !!options.slide;	//滑动
	this.loop = !!options.loop;		//循环
	this.step = options.step;
	this.bounceThreshold = options.bounceThreshold || 0.5;	//弹性的阀值

	this.name = options.name;

	this.property = options.vertical ? 'Y' : 'X';
	this.vertical = !!options.vertical;

	this.min = options.min;
	this.max = options.max;

	this.isStart = false;
	this.isLocked = false;

	eventExtend(this);
	init.call(this);
}

function init(){
	this.items = [].slice.call(this.scroller.children);
	this.itemLength = this.items.length;
	this.index = 0;
	if(this.loop){
		let firstItem = this.items[0];
		let lastItem = this.items[this.itemLength - 1];
		this.scroller.insertBefore(lastItem.cloneNode(true), firstItem);
		this.scroller.appendChild(firstItem.cloneNode(true));
		this.items = [].slice.call(this.scroller.children);
		this.itemLength = this.items.length;
		this.index = 1;
		this.slideTo();
	}
	
	this.wrapper.addEventListener('touchstart', bind(start, this));
	this.wrapper.addEventListener('touchmove', preventDefault(move, this), { passive: false });
	this.wrapper.addEventListener('touchend', bind(end, this));

	var self = this;
	var transitionHandler = function(e){
		if(e.target === self.scroller){
			self.trigger('moveEnd');
		}
	}
	this.scroller.addEventListener('transitionend', transitionHandler);
	this.scroller.addEventListener('webkitTransitionEnd', transitionHandler);
}

function preventDefault(fn, context){
	return function(e){
		if(/^touch/.test(e.type)){
			e.preventDefault();	
			fn.call(context, e);
		}
	}
}

function bind(fn, context){
	return function(e){
		if(/^touch/.test(e.type)) fn.call(context, e);
	}
}

function start(e){
	if(this.loop){
		this.fixLoop();
	}

	this.isStart = true;
	this.pause();
	this.startTime = new Date().getTime();

	var point = e.touches[0];
	this.startX = this.pointX = point.pageX;
	this.startY = this.pointY = point.pageY;

	this.distX = 0;
	this.distY = 0;

	this.start = this.moveStart = point['page' + this.property];

	this.directionLocked = '';
	this.isLocked = false;

	this.trigger('moveStart');
}

function move(e){
	if(!this.isStart) return;
	
	var point = e.touches[0];
	var deltaX = point.pageX - this.pointX;
	var deltaY = point.pageY - this.pointY;

	this.pointX = point.pageX;
	this.pointY = point.pageY;

	this.distX += deltaX;
	this.distY += deltaY;

	if(!this.directionLocked){
		let absDisX = Math.abs(this.distX);
		let absDisY = Math.abs(this.distY);
		if(absDisX > absDisY + 2){
			this.directionLocked = 'h'
			if(this.vertical) this.isLocked = true; 
		} else if(absDisY > absDisX + 2){
			this.directionLocked = 'v'
			if(!this.vertical) this.isLocked = true;
		}
	}

	if(this.directionLocked == 'h'){
		deltaY = 0;
	} else if(this.directionLocked == 'v'){
		deltaX = 0;
	}

	var t = new Date().getTime();
	if(t - this.startTime > 300){
		this.moveStart = point['page' + this.property];
		this.startTime = t;
	}
	if((this.directionLocked == 'h' && !this.vertical) || (this.directionLocked == 'v' && this.vertical)){
		var delta = this.vertical ? deltaY : deltaX;
		var position = this.getComputedPosition(delta);
		if(this.noOutOfBounds) {
			let _position = this.getPosition();
			checkMaxMin.call(this, position);
			delta = position[this.property] - _position[this.property];
		}
		setPosition.call(this, position);
		this.trigger('move', delta);
	}
}

function end(e){
	if(!this.isStart || this.isLocked) return;
	var current = e.changedTouches[0]['page' + this.property];

	var t = new Date().getTime();
	var dt = t - this.startTime;

	var moveDistance = current - this.moveStart;
	var absMoveDistance = Math.abs(moveDistance);
	var direction = moveDistance > 0 ? 1 : -1;
	var position = this.getPosition();

	if(position[this.property] < this.max && position[this.property] > this.min && dt < 300 && absMoveDistance > 100 && this.slide){
		var v = absMoveDistance / dt;
		let d = v * v / (2 * this.deceleration) * direction;
		var _position = JSON.parse(JSON.stringify(position));
		position[this.property] += d;
		correct.call(this, position);
		d = position[this.property] - _position[this.property];
		var deceleration = v * v / Math.abs(d) / 2;
		var duration = v / deceleration;
		this.to(position, v, duration, deceleration, direction);
	} else if(!this.noBounce){
		if(this.step){
			let distance = current - this.start;
			let md = Math.abs(distance % this.step);
			let d;
			if(md > this.step * this.bounceThreshold){
				d = (this.step - md) * (distance > 0 ? 1 : -1);
			} else {
				d = md * (distance > 0 ? -1 : 1);
			}
			position[this.property] += d;
		}
		correct.call(this, position);
		setPosition.call(this, position, 500);
	}
	this.start = this.moveStart = 0;
}

function checkStep(position){
	if(this.step){
		position[this.property] = Math.round(position[this.property] / this.step) * this.step;
	}
}

function checkMaxMin(position){
	if(this.min !== undefined && position[this.property] < this.min) position[this.property] = this.min;
	if(this.max !== undefined && position[this.property] > this.max) position[this.property] = this.max;
}

function correct(position){
	checkStep.call(this, position);
	checkMaxMin.call(this, position);
}

function setPosition(position, duration = 0){
	setDuration(this.scroller, `${duration}ms`);
	setTransform(this.scroller, `translate3d(${position.X}px, ${position.Y}px, 0)`);
	if(this.wheel){
		this.items.forEach((item, i) => {
			let deg = ((position.Y / this.step) + i) * this.step * this.bounceThreshold;
			setDuration(item, `${duration}ms`);
			setTransform(item, `rotateX(${deg}deg)`);
		})
	}
}

Scroll.prototype.to = function(position, v, time, deceleration, direction){
	var beginTime = new Date();
	var _position = this.getPosition();
	var self = this;
	var id;
	var _to = function(){
		var dt = new Date() - beginTime;
		if(dt >= time){;
			setPosition.call(self, position);
			cancelAnimationFrame(id);
			self.trigger('moveEnd');
			return;
		}
		let d = (v * dt - dt * dt * deceleration / 2) * direction;
		let current = JSON.parse(JSON.stringify(_position));
		current[self.property] += d;
		setPosition.call(self, current);
		id = requestAnimationFrame(_to);
	}
	_to();
}

Scroll.prototype.getPosition = function(){
	return getTransform(this.scroller);
}

Scroll.prototype.getComputedPosition = function(d){
	var position = this.getPosition();
	position[this.property] += d;
	return position;
}

Scroll.prototype.slideTo = function(i, duration){
	if(i === undefined || !this.step) return;
	var d = -this.step * i;
	var position = this.getPosition();
	position[this.property] = d;
	setPosition.call(this, position, duration);
}

Scroll.prototype.getIndex = function(){
	if(!this.step) return;
	var position = this.getPosition();
	return Math.round(Math.abs(position[this.property]) / this.step);
}

Scroll.prototype.fixLoop = function(){
	var index = this.getIndex();
	if(index === 0){
		this.slideTo(this.itemLength - 2);
	} else if(index === this.itemLength - 1){
		this.slideTo(1);
	}
}

Scroll.prototype.startAutoPlay = function(interval, speed, direction = 1){
	if(interval <= speed){
		console.log('ERROR:---轮播间隔须大于速度---');
		return;
	}
	var self = this;
	this.autoPlayID = setInterval(function(){
		if(self.loop) self.fixLoop();
		if(!self.isTouchStart)self.slideTo(self.getIndex() + direction, speed);
	}, interval)
}

Scroll.prototype.stopAutoPlay = function(){
	if(!this.autoPlayID) return;
	clearInterval(this.autoPlayID);
	this.autoPlayID = undefined;
}

Scroll.prototype.pause = function(){
	this.scroller.style.transitionDuration = '0';
}

Scroll.prototype.updateOptions = function(options){
	for(let property in options){
		if(properties.indexOf(property) == -1) continue;
		this[property] = options[property];
	}
}

export default Scroll;