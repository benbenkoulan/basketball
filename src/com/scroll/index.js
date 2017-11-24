import style from './style'
import eventMixin from 'utils/eventMixin'
import { requestAnimationFrame, cancelAnimationFrame } from 'utils/raf'

function Scroll(el, options){
	this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.deceleration = options.deceleration || 0.01;
	this.noBounce = !!options.noBounce;	//弹性效果
	this.wheel = !!options.wheel;	//滚动轮效果
	this.slide = !!options.slide;	//滑动
	this.loop = !!options.loop;		//循环
	this.step = options.step;

	this.property = options.vertical ? 'Y' : 'X';

	this.min = options.min;
	this.max = options.max;

	this.isStart = false;
	this.events = [];
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
	this.scroller.addEventListener('touchstart', preventDefault(start, this));
	this.scroller.addEventListener('touchmove', preventDefault(move, this));
	this.scroller.addEventListener('touchend', preventDefault(end, this));

	var self = this;
	var transitionHandler = function(e){
		if(e.target === self.scroller){
			var position = self.getPosition();
			self.trigger('moveEnd', position);
		}
	}
	this.scroller.addEventListener('transitionend', transitionHandler);
	this.scroller.addEventListener('webkitTransitionEnd', transitionHandler);
}

function preventDefault(fn, context){
	return function(e){
		e.preventDefault();
		fn.call(context, e);
	}
}

function start(e){
	if(this.loop){
		this.fixLoop();
	}
	this.isStart = true;
	this.pause();
	this.startTime = new Date().getTime();
	this.start = this.moved = this.moveStart = e.touches[0]['page' + this.property];
	this.trigger('start');
}

function move(e){
	if(!this.isStart) return;
	var t = new Date().getTime();
	if(t - this.startTime > 300){
		this.moveStart = current;
		this.startTime = t;
	}
	var current = e.touches[0]['page' + this.property];
	var d = current - this.moved;	
	this.moved = current;
	var position = this.getComputedPosition(d);
	this.setPosition(position);
	this.trigger('move', position);
}

function end(e){
	if(!this.isStart) return;
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
		this.correct(position);
		d = position[this.property] - _position[this.property];
		var deceleration = v * v / Math.abs(d) / 2;
		var duration = v / deceleration;
		this.to(position, v, duration, deceleration, direction);
	} else if(!this.noBounce){
		let distance = current - this.start;
		let md = Math.abs(distance % this.step);
		let d;
		if(md > this.step / 2){
			d = (this.step - md) * (distance > 0 ? 1 : -1);
		} else {
			d = md * (distance > 0 ? -1 : 1);
		}
		position[this.property] += d;
		this.correct(position);
		this.setPosition(position, 500);
	}
	this.isStart = false;
	this.start = this.moved = this.moveStart = 0;
}

Scroll.prototype.to = function(position, v, time, deceleration, direction){
	console.log(position);
	var beginTime = new Date();
	var _position = this.getPosition();
	console.log(_position);
	var self = this;
	var id;
	var _to = function(){
		var dt = new Date() - beginTime;
		if(dt >= time){;
			self.setPosition(position);
			cancelAnimationFrame(id);
			return;
		}
		let d = (v * dt - dt * dt * deceleration / 2) * direction;
		let current = JSON.parse(JSON.stringify(_position));
		current[self.property] += d;
		self.setPosition(current);
		id = requestAnimationFrame(_to);
	}
	_to();
}

Scroll.prototype.correct = function(position){
	if(this.step){
		position[this.property] = Math.round(position[this.property] / this.step) * this.step;
	}
	if(this.min !== undefined && position[this.property] < this.min) position[this.property] = this.min;
	if(this.max !== undefined && position[this.property] > this.max) position[this.property] = this.max;
}

Scroll.prototype.setPosition = function(position, duration = 0){
	var scrollerStyle = this.scroller.style;
	//TODO:优化
	if(duration > 0){
		console.log(position);
	}
	scrollerStyle.transitionDuration = `${duration}ms`;
	scrollerStyle.webkitTransform = scrollerStyle.MsTransform = scrollerStyle.msTransform = scrollerStyle.MozTransform = scrollerStyle.OTransform = scrollerStyle.transform 
	=  `translate3d(${position.X}px, ${position.Y}px, 0)`;
	if(this.wheel){
		for(let i = 0, len = this.items.length;i < len;i++){
			let item = this.items[i];
			let deg = ((position.Y / this.step) + i) * this.step / 2;
			let itemStyle = item.style;
			itemStyle.transitionDuration = `${duration}ms`;
			itemStyle.webkitTransform = itemStyle.MsTransform = itemStyle.msTransform = itemStyle.MozTransform = itemStyle.OTransform = itemStyle.transform = 
			`rotateX(${deg}deg)`;
		}
	}
	this.index = Math.abs(Math.floor(position[this.property] / this.step));
}

Scroll.prototype.getPosition = function(){
	let curTransform, transformMatrix, matrix;
	let curStyle = window.getComputedStyle(this.scroller, null);
	if(window.WebKitCSSMatrix){
		curTransform = curStyle.transform || curStyle.webkitTransform;
		if (curTransform.split(',').length > 6) {
			curTransform = curTransform.split(', ').map(function(a){
				return a.replace(',','.');
			}).join(', ');
		}
		transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
	} else {
		transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
		matrix = transformMatrix.toString().split(',');
	}
	let X, Y;
	if (window.WebKitCSSMatrix) {//Latest Chrome and webkits Fix
		Y = transformMatrix.m42;
    	X = transformMatrix.m41;
	} else if (matrix.length === 16) {	//Crazy IE10 Matrix
		Y = parseFloat(matrix[13]);
    	X = parseFloat(matrix[12]);
	} else {	//Normal Browsers
		Y = parseFloat(matrix[5]);
    	X = parseFloat(matrix[4]);
	}
    return { X, Y }
}

Scroll.prototype.getComputedPosition = function(d){
	var position = this.getPosition();
	position[this.property] += d;
	return position;
}

Scroll.prototype.slideTo = function(i, duration){
	if(i === undefined) i = this.index;
	var d = -this.step * i;
	var position = this.getPosition();
	position[this.property] = d;
	this.setPosition(position, duration);
}

Scroll.prototype.fixLoop = function(){
	if(this.index == 0){
		this.slideTo(this.itemLength - 2);
	} else if(this.index == this.itemLength - 1){
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
		if(!self.isTouchStart)self.slideTo(self.index + direction, speed);
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

eventMixin(Scroll);

export default Scroll;